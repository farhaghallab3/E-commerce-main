import Image from "next/image";

import MainSlider from "./_Component/MainSlider/MainSlider";
// Images are now in public directory

import ProductGridSkeleton from "./_Component/Skeleton/ProductGridSkeleton";
import { Suspense } from "react";
import AllProducts from "./_Component/Product/AllProducts";

export default function Home() {
  return (
    <>
      {/* first section */}
      <div className="md:w-[50%] mx-auto flex m-10">
        <div className="w-[50%] z-0">
          <MainSlider />
        </div>
        <div>
          <Image
            src="/c-d-x-PDX_a_82obo-unsplash.jpg"
            width={400}
            height={100}
            alt="slider image 1"
            className="w-full h-[12rem] object-cover"
          />
          <Image
            src="/rachit-tank-2cFZ_FB08UM-unsplash.jpg"
            width={400}
            height={100}
            alt="slider image 2"
            className="w-full h-[12rem] object-cover"
          />
        </div>
      </div>

      {/* second section */}
      <Suspense fallback={<ProductGridSkeleton />}>
        <AllProducts />
      </Suspense>
    </>
  );
}
