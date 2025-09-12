import { Suspense } from "react";
import ProductGridSkeleton from "@/app/_Component/Skeleton/ProductGridSkeleton";
import AllProducts from "@/app/_Component/Product/AllProducts";

export default async function ProductsSection() {
  return (
    <Suspense fallback={<ProductGridSkeleton />}>
      <AllProducts />
    </Suspense>
  );
}
