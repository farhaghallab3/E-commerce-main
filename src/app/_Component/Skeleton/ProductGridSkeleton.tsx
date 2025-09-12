"use client"
import React from 'react'
import ProductCardSkeleton from './ProductCardSkeleton';

export default function ProductGridSkeleton() {
  return (
    <section className="p-6 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
      {Array.from({ length: 20 }).map((_, indx) => (
        <ProductCardSkeleton key={indx} />
      ))}
    </section>
  )
}
