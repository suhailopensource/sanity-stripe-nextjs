"use server";
import { client } from "@/sanity/lib/client";
import { redirect } from "next/navigation";
import Stripe from "stripe";

export const fetchProductdata = async () => {
  const aboutQuery = `*[_type == "product"]{
  _id,
  productName,
  price,
  "imageUrl": image.asset->url
}
`;

  return await client.fetch(aboutQuery);
};


export async function checkoutProduct(transaction: any) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  const amount = Number(transaction.price) * 100;

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "usd",
          unit_amount: amount,
          product_data: {
            name: transaction.name,
            images: [transaction.image], // Pass the image URL here
          },
        },
        quantity: 1,
      },
    ],
    metadata: {
      image: transaction.image, // You can store additional metadata
    },
    mode: "payment",
    success_url: `http://localhost:3000/`,
    cancel_url: `http://localhost:3000/cancel`,
  });

  redirect(session.url!);
}
