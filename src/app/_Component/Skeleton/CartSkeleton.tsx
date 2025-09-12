import { Skeleton } from '@heroui/react'
import React from 'react'

export default function CartSkeleton() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        {/* Header Skeleton */}
        <Skeleton className="rounded-lg mb-6">
          <div className="h-8 w-48 bg-default-300" />
        </Skeleton>

        {/* Cart Items Skeleton */}
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row items-center sm:items-start border-b border-gray-200 pb-4 mb-4 gap-4"
            >
              {/* Image Skeleton */}
              <Skeleton className="rounded-lg">
                <div className="w-24 h-24 bg-default-300" />
              </Skeleton>

              {/* Content Skeleton */}
              <div className="ml-4 flex-1 space-y-2">
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

              {/* Quantity Controls Skeleton */}
              <div className="flex items-center gap-2 mr-6">
                <Skeleton className="rounded-lg">
                  <div className="w-8 h-8 bg-default-300" />
                </Skeleton>
                <Skeleton className="rounded-lg">
                  <div className="w-6 h-6 bg-default-300" />
                </Skeleton>
                <Skeleton className="rounded-lg">
                  <div className="w-8 h-8 bg-default-300" />
                </Skeleton>
              </div>

              {/* Delete Button Skeleton */}
              <Skeleton className="rounded-full">
                <div className="w-6 h-6 bg-default-300" />
              </Skeleton>
            </div>
          ))}
        </div>

        {/* Total and Buttons Skeleton */}
        <div className="mt-6 space-y-4">
          {/* Total Skeleton */}
          <div className="flex justify-between items-center">
            <Skeleton className="rounded-lg">
              <div className="h-7 w-24 bg-default-300" />
            </Skeleton>
            <Skeleton className="rounded-lg">
              <div className="h-7 w-20 bg-default-300" />
            </Skeleton>
          </div>

          {/* Buttons Skeleton */}
          <div className="flex justify-between">
            <Skeleton className="rounded-lg">
              <div className="w-24 h-10 bg-default-300" />
            </Skeleton>
            <Skeleton className="rounded-lg">
              <div className="w-32 h-10 bg-default-300" />
            </Skeleton>
          </div>
        </div>
      </div>
    </div>
  )
}