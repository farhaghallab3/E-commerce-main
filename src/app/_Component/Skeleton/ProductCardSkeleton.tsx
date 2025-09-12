 "use client"
import React from "react";
import { Card, CardHeader, CardBody, Skeleton } from "@heroui/react";

export default function ProductCardSkeleton() {
  return (
    <Card className="py-4" radius="lg">
      {/* Image Skeleton */}
      <CardBody className="overflow-visible py-2">
       
        <Skeleton className="rounded-xl">
          <div className="h-[22rem] w-[270px] rounded-xl bg-default-300" />
        </Skeleton>
      </CardBody>

      {/* Text Skeleton */}
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start space-y-2 w-full">
        {/* category */}
        <Skeleton className="w-1/3 rounded-lg">
          <div className="h-3 w-full bg-default-200 rounded-lg" />
        </Skeleton>

        {/* title */}
        <Skeleton className="w-4/5 rounded-lg">
          <div className="h-4 w-full bg-default-200 rounded-lg" />
        </Skeleton>

        {/* price */}
        <Skeleton className="w-2/5 rounded-lg">
          <div className="h-3 w-full bg-default-300 rounded-lg" />
        </Skeleton>
      </CardHeader>
    </Card>
  );
}
