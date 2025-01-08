import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia",
});

export async function POST(req: NextRequest) {
  try {
    const { name, price, image } = await req.json();

    // Convert price to cents
    const amountInCents = Math.round(price * 100);

    // Create a Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"], // "card" includes support for GPay if the environment supports it
      line_items: [
        {
          price_data: {
            currency: "inr", // Make sure this is a supported currency for GPay
            product_data: {
              name,
              images: [image], // Provide the product image URL
            },
            unit_amount: amountInCents, // Price in cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${req.headers.get("origin")}/success`,
      cancel_url: `${req.headers.get("origin")}/cancel`,
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
