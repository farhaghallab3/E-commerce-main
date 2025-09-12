"use client";
import { deleteProductFromWishlist, getLoggedUserWishlist } from "@/lib/Services/wishList";
import { addProductToCart } from "@/lib/Services/cart";
import { Card, CardHeader, CardBody, Image } from "@heroui/react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Loading from "@/app/_Component/Loading";
import { Iproduct } from "@/app/types/products.type";
import { useState } from "react";
import WishlistSkeleton from "@/app/_Component/Skeleton/WishlistSkeleton";

export default function WishlistPage() {
  const queryClient = useQueryClient();
  const [loadingItemId, setLoadingItemId] = useState<string | null>(null);
  const [removingItemId, setRemovingItemId] = useState<string | null>(null);

  // Fetch wishlist
const {
    data: wishlist,
    isLoading,
  } = useQuery({
    queryKey: ["wishlist"],
    queryFn: async () => {
      const res = await getLoggedUserWishlist();
      return res?.data as Iproduct[];
    },
  });
  

  // remove from wishlist
  const { mutate: removeFromWishlist } = useMutation({
    mutationFn: (id: string) => deleteProductFromWishlist(id),
    onMutate: (id) => {
      setRemovingItemId(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      toast.success("Removed from wishlist");
    },
    onError: () => toast.error("Failed to remove from wishlist"),
    onSettled: () => {
      setRemovingItemId(null);
    },
  });

  // add to cart
  const { mutate: addToCart } = useMutation({
    mutationFn: (id: string) => addProductToCart(id),
    onMutate: (id) => {
      setLoadingItemId(id);
    },
    onSuccess: (res) => {
      toast.success(res.message);
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: () => toast.error("Failed to add to cart"),
    onSettled: () => {
      setLoadingItemId(null);
    },
  });

  if (isLoading)  return <WishlistSkeleton/>

 
  return (
    <Card className="max-w-[75%] mx-auto my-10">
      <CardHeader className="flex gap-3">
        <div className="flex flex-col items-center justify-center w-full">
          <p>
            <i className="fa-regular fa-heart text-5xl font-light"></i>
          </p>
          <p className="font-light">Wishlist</p>
        </div>
      </CardHeader>

      <CardBody>
        {wishlist && wishlist.length === 0 ? (
          <p className="font-light">Wishlist is empty</p>
        ) : (
          wishlist?.map((item) => (
            <div
              key={item._id}
              className="flex flex-col sm:flex-row items-center justify-center sm:items-start border-b border-gray-200 pb-4 mb-4 gap-4"
            >
              <Image
                src={item.imageCover}
                alt={item.title}
                width={100}
                height={100}
                className="rounded-lg object-cover"
              />
              <div className="ml-4 flex-1">
                <h2 className="text-lg font-semibold">{item.title}</h2>
                <p className="text-sm text-gray-500">{item.category.name}</p>
                <p className="text-green-600 font-bold">{item.price} EGP</p>
              </div>

              <button
                onClick={() => {
                  removeFromWishlist(item._id);
                  addToCart(item._id);
                }}
                className="bg-green-500 text-white rounded-xl p-2"
              >
                {loadingItemId === item._id ? "Adding..." : "Add To Cart"}
              </button>

              <button
                onClick={() => removeFromWishlist(item._id)}
                className="text-red-500 hover:text-red-700"
                disabled={removingItemId === item._id}
              >
                {removingItemId === item._id ? (
                  <i className="fa-solid fa-spinner fa-spin"></i>
                ) : (
                  <i className="fa-solid fa-trash"></i>
                )}
              </button>
            </div>
          ))
        )}
      </CardBody>
    </Card>
  );
}
