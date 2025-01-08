"use client";

import { checkoutProduct } from "@/lib/utils";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect } from "react";





const Checkout = ({
    name, price, image
}: {
    name: string;
    price: number;
    image: string;
}) => {


    useEffect(() => {
        loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
    }, []);



    const onCheckout = async (e: React.FormEvent) => {
        e.preventDefault(); // Prevent form submission
        const transaction = { name, price, image };
        await checkoutProduct(transaction);
    };

    return (
        <form onSubmit={onCheckout} >
            <section>
                <button
                    type="submit"
                    role="link"
                    className="w-full rounded-full bg-black bg-cover"
                >
                    Buy Product
                </button>
            </section>
        </form>
    );
};

export default Checkout;
