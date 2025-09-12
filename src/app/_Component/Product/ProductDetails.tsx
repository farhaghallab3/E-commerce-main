"use client";
import { addProductToWishlist } from "@/lib/Services/wishList";
import { addProductToCart } from "@/lib/Services/cart";
import { Iproduct } from "@/app/types/products.type";
import Image from "next/image";
import React, { useState } from "react";
import toast from "react-hot-toast";
 
export default function ProductDetails({ product }: { product: Iproduct }) {
 
  const [mainImage, setMainImage] = useState(product.imageCover);
 async function addToCart() {
     const res=await addProductToCart(product._id);
    toast.success(res.message);
  }
async function addToWishlis() {
     const res=await addProductToWishlist(product._id);
     console.log(res)
      toast.success(res.message);
  }
  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
       
        <div className="flex flex-col items-center gap-4">
          <Image
            src={mainImage}
            alt={product.title}
            width={400}
            height={400}
            className="rounded-lg shadow-md object-cover"
          />

          <div className="flex gap-2 flex-wrap justify-center">
            {[ ...(product.images || [])].map((img, index) => (
              <Image
                key={index}
                src={img}
                alt={`Thumbnail ${index + 1}`}
                width={80}
                height={80}
                onClick={() => setMainImage(img)}
                className={`rounded-md cursor-pointer border ${
                  mainImage === img ? "border-green-600" : "border-transparent"
                } hover:border-green-600`}
              />
            ))}
          </div>
        </div>

   
        <div className="flex flex-col space-y-4">
          <h1 className="text-2xl font-bold">{product.title}</h1>
          <p className="text-gray-600 whitespace-pre-line">{product.description}</p>
          <p className="text-xl font-semibold text-green-600">{product.price} EGP</p>

     
          <p className="text-sm text-gray-500">Category: {product.category?.name}</p>
          <p className="text-sm text-gray-500">Brand: {product.brand?.name}</p>
          <p className="text-sm text-gray-500">Subcategory: {product.subcategory?.[0]?.name}</p>

        <div className="flex items-center gap-2">
            <span className="text-yellow-500"><i className="fa-solid fa-star text-yellow-500" ></i>{product.ratingsAverage}</span>
            <span className="text-gray-500">({product.ratingsQuantity} reviews)</span>
          </div>

        
          <div className="flex gap-4 mt-4">
            <button onClick={addToCart} className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700">
              Add to Cart
            </button>
            <button onClick={addToWishlis} className="border border-gray-400 px-6 py-2 rounded-lg hover:bg-gray-100">
              Wishlist
            </button>
          </div>

       
          <p className="text-sm text-gray-500">In Stock: {product.quantity}</p>
          <p className="text-sm text-gray-500">Sold: {product.sold}</p>
        </div>
      </div>

 
      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-4">Product Details</h2>
        <p className="text-gray-700 leading-relaxed">{product.description}</p>
      </div>
    </div>
  );
}
