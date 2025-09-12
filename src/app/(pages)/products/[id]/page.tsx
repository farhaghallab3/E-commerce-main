import ProductDetails from '@/app/_Component/Product/ProductDetails';
import { getProductDetails } from '@/lib/Services/products';
import React from 'react'
import { Iproduct } from '@/app/types/products.type';
export default async function Page({ params }: { params: { id: string } }) {
  console.log("params:", params);  
  const id = params.id;
 
  const { data } = await getProductDetails(id);
  const product: Iproduct = data;
console.log(data);
  return (
    <div className="p-6">
      <ProductDetails product={product} />
    </div>
  );
}

