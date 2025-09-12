import { Skeleton } from '@heroui/react'
import React from 'react'

export default function WishlistSkeleton() {
  return (
    <div className="max-w-[75%] mx-auto my-10">
    
      <div className="flex flex-col items-center justify-center w-full mb-8">
        <Skeleton className="rounded-full">
          <div className="h-16 w-16 bg-default-300" />
        </Skeleton>
        <Skeleton className="rounded-lg mt-2">
          <div className="h-6 w-32 bg-default-300" />
        </Skeleton>
      </div>

    
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row items-center justify-center sm:items-start border-b border-gray-200 pb-4 gap-4"
          >
          
            <Skeleton className="rounded-lg">
              <div className="h-24 w-24 bg-default-300" />
            </Skeleton>

          
            <div className="flex-1 space-y-2">
              <Skeleton className="rounded-lg">
                <div className="h-6 w-48 bg-default-300" />
              </Skeleton>
              <Skeleton className="rounded-lg">
                <div className="h-4 w-32 bg-default-300" />
              </Skeleton>
              <Skeleton className="rounded-lg">
                <div className="h-5 w-24 bg-default-300" />
              </Skeleton>
            </div>

            {/* Buttons Skeleton */}
            <div className="flex gap-2">
              <Skeleton className="rounded-xl">
                <div className="h-10 w-32 bg-default-300" />
              </Skeleton>
              <Skeleton className="rounded-full">
                <div className="h-10 w-10 bg-default-300" />
              </Skeleton>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}