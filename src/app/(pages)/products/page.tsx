import React, { Suspense } from "react";
import ProductGridSkeleton from "@/app/_Component/Skeleton/ProductGridSkeleton";
import AllProducts from "@/app/_Component/Product/AllProducts";
import SearchInputWithSuspense from "@/app/_Component/Product/searchWrapper";

interface ProductsPageProps {
  searchParams?: {
    search?: string;
  };
}

export default async function Page({ searchParams }: ProductsPageProps) {
  return (
    <>
      <SearchInputWithSuspense />
      <Suspense fallback={<ProductGridSkeleton />}>
        <AllProducts searchParams={searchParams} />
      </Suspense>
    </>
  );
}
