import React from 'react';
import ProductCard from './components/ProductCard';
import { fetchProductdata } from '@/lib/utils';

const Page = async () => {
  // Fetch data from Sanity
  const data = await fetchProductdata();

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4">PRODUCTS</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((item: { productName: string; price: number; imageUrl: string }, index: number) => (
          <ProductCard
            key={index}
            name={item.productName}
            price={item.price}
            image={item.imageUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default Page;
