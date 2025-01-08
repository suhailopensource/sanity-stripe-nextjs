
'use client';

import Image from 'next/image';
import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import Checkout from './CheckOutBtn';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export type Props = {
    name: string;
    price: number;
    image: string;
};

const ProductCard = ({ name, price, image }: Props) => {
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
            <Image
                className="w-full"
                src={image}
                alt={name}
                width={400}
                height={300}
                objectFit="cover"
            />
            <div className="px-6 py-4">
                <h2 className="font-bold text-xl mb-2 text-black">{name}</h2>
                <p className="text-gray-700">${price.toFixed(2)}</p>
                <div className="mt-4">
                    {/* Ensure Checkout component is passed the correct props */}
                    <Checkout name={name} price={price} image={image} />
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
