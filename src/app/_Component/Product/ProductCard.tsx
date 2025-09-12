"use client";
import React, { useState, useEffect } from "react";
import { Iproduct } from "@/app/types/products.type";
import { Card, CardHeader, CardBody, Image, Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addProductToCart } from "@/lib/Services/cart";
import {
  addProductToWishlist,
  deleteProductFromWishlist,
} from "@/lib/Services/wishList";
 
const getCookie = (name: string) => {
  if (typeof document === 'undefined') return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    const result = parts.pop();
    return result ? result.split(';').shift() : null;
  }
  return null;
};

export default function ProductCard({
  product,
  isInWishlist = false,
}: {
  product: Iproduct;
  isInWishlist?: boolean;
}) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [inWishlist, setInWishlist] = useState(isInWishlist);
  const [loadingCart, setLoadingCart] = useState(false);
  const [loadingWishlist, setLoadingWishlist] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

 
  useEffect(() => {
    const checkAuthStatus = () => {
      const token = getCookie('token');
      setIsLoggedIn(!!token);
    };

    checkAuthStatus();
    const intervalId = setInterval(checkAuthStatus, 1000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    setInWishlist(isInWishlist);
  }, [isInWishlist]);

 
  const checkAuth = () => {
    if (!isLoggedIn) {
      toast.error("Please login to add items");
      return false;
    }
    return true;
  };

 
  const { mutate: addToCartMutate } = useMutation({
    mutationFn: () => addProductToCart(product._id),
    onMutate: () => {
      if (!checkAuth()) {
        throw new Error("Not authenticated");
      }
      setLoadingCart(true);
    },
    onSuccess: (data) => {
      toast.success(data?.message || "Added to cart");
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      queryClient.refetchQueries({ queryKey: ["cart"] });
    },
    onError: (err: any) => {
      if (err.message !== "Not authenticated") {
        toast.error(err?.response?.data?.message || "Failed to add to cart");
      }
    },
    onSettled: () => setLoadingCart(false),
  });

  // Add to Wishlist 
  const { mutate: addToWishlistMutate } = useMutation({
    mutationFn: () => addProductToWishlist(product._id),
    onMutate: () => {
      if (!checkAuth()) {
        throw new Error("Not authenticated");
      }
      setLoadingWishlist(true);
    },
    onSuccess: (data) => {
      toast.success(data?.message || "Added to wishlist");
      setInWishlist(true);
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    },
    onError: (err: any) => {
      if (err.message !== "Not authenticated") {
        toast.error("Failed to add to wishlist");
      }
    },
    onSettled: () => setLoadingWishlist(false),
  });

  // Remove from Wishlist 
  const { mutate: removeFromWishlistMutate } = useMutation({
    mutationFn: () => deleteProductFromWishlist(product._id),
    onMutate: () => {
      if (!checkAuth()) {
        throw new Error("Not authenticated");
      }
      setLoadingWishlist(true);
    },
    onSuccess: (data) => {
      toast.success(data?.message || "Removed from wishlist");
      setInWishlist(false);
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    },
    onError: (err: any) => {
      if (err.message !== "Not authenticated") {
        toast.error("Failed to remove from wishlist");
      }
    },
    onSettled: () => setLoadingWishlist(false),
  });
 
  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCartMutate();
  };

 
  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (inWishlist) removeFromWishlistMutate();
    else addToWishlistMutate();
  };

  return (
    <Card
      isPressable
      onPress={() => router.push(`/products/${product.id}`)}
      className="relative py-4 cursor-pointer transition-all duration-300 ease-in-out"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transform: isHovered ? "translateY(-8px)" : "translateY(0)",
        boxShadow: isHovered 
          ? "0 20px 40px rgba(0, 0, 0, 0.15), 0 10px 10px rgba(0, 0, 0, 0.05)"
          : "0 4px 6px rgba(0, 0, 0, 0.05)",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
      }}
    >
      {/* Wishlist Icon */}
      <div
        role="button"
        aria-pressed={inWishlist}
        className={`absolute top-3 right-3 z-50 p-2 rounded-full shadow cursor-pointer transition-all duration-200
          ${inWishlist 
            ? "bg-red-500 text-white scale-110" 
            : "bg-white text-gray-600 hover:bg-red-100"
          }
          ${isHovered ? "opacity-100" : "opacity-90"}`}
        onClick={handleWishlistToggle}
      >
        {loadingWishlist ? (
          <i className="fa-solid fa-spinner fa-spin text-xl"></i>
        ) : (
          <i className={`text-xl ${inWishlist ? "fa-solid fa-heart" : "fa-regular fa-heart"}`}></i>
        )}
      </div>

      {/* Product Image */}
      <CardBody className="overflow-visible py-2 relative">
        <Image
          alt={product.title}
          className={`object-cover text-center rounded-xl sm:h-[22rem] h-[20rem] w-full transition-all duration-500
            ${isHovered ? " scale-105 brightness-110" : " scale-100 brightness-100"}`}
          src={product.imageCover}
          width={500}
        />
        
       
        {isHovered && (
          <div className="absolute inset-0 bg-opacity-40 flex items-center justify-center rounded-xl transition-opacity duration-300">
            <Button
              size="md"
              color="primary"
              variant="solid"
              className="text-white font-semibold"
              onClick={(e) => {
                e.stopPropagation();
                router.push(`/products/${product.id}`);
              }}
            >
              Quick View
            </Button>
          </div>
        )}
      </CardBody>

      {/* Product Details */}
      <CardHeader className="pb-2 pt-2 px-4 flex-col items-start space-y-2">
        <p className="text-green-600 font-medium text-sm">{product.category.name}</p>
        <h4 className="font-bold text-lg line-clamp-1 transition-colors duration-200
          ${isHovered ? 'text-blue-600' : 'text-gray-900'}">
          {product.title}
        </h4>
        <small className="text-default-500 font-semibold text-md">{product.price} EGP</small>

        <Button
          size="sm"
          variant="solid"
          color="success"
          className={`mt-2 w-full transition-all duration-300
            ${isHovered 
              ? "bg-green-700 scale-105 shadow-lg" 
              : "bg-green-600 scale-100"
            }`}
          onClick={handleAddToCart}
        >
          {loadingCart ? (
            <span className="flex items-center gap-2">
              <i className="fa-solid fa-spinner fa-spin"></i>
              Adding...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <i className="fa-solid fa-cart-plus"></i>
              Add to Cart
            </span>
          )}
        </Button>
      </CardHeader>
    </Card>
  );
}