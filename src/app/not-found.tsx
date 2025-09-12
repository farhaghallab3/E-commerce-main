"use client";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full text-center">
      
        <div className="mb-8">
          <div className="text-9xl font-bold text-gray-300">404</div>
        </div>
 
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Page Not Found
          </h1>
          
          <p className="text-gray-600 mb-6">
            Sorry, we couldn't find the page you're looking for.
          </p>
        </div>

         
        <div className="mb-8">
          <div className="w-32 h-32 mx-auto">
            <div className="w-full h-full bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-4xl fa fa-search"> </span>
            </div>
          </div>
        </div>
 
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            color="primary"
            onClick={() => router.back()}
            className="flex-1 sm:flex-none"
          >
            Go Back
          </Button>
          
          <Button
            color="default"
            variant="flat"
            onClick={() => router.push("/")}
            className="flex-1 sm:flex-none"
          >
            Go Home
          </Button>
        </div>

        
      </div>
    </div>
  );
}