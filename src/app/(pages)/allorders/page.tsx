"use client";

import { getAllUserOrders } from "@/lib/Services/orders";
import React, { useEffect, useState } from "react";
import { IOrder } from "@/app/types/orders.type";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import OrderSkeleton from "@/app/_Component/Skeleton/OrderSkeleton";

 
const getCookie = (name: string) => {
  if (typeof document === "undefined") return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    const result = parts.pop();
    return result ? result.split(";").shift() : null;
  }
  return null;
};
 
const parseJwt = (token?: string | null) => {
  if (!token) return null;
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

export default function Allorders() {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

   
  useEffect(() => {
    const checkAuthStatus = () => {
      const token = getCookie("token");
       const isAuthenticated = !!token;
      setIsLoggedIn(isAuthenticated);

      return true;
    };

    checkAuthStatus();
    const intervalId = setInterval(checkAuthStatus, 1000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    async function fetchOrders() {
      const token = getCookie("token");

      try {
        const decodedToken = parseJwt(token);
        const userId = decodedToken?.userId || decodedToken?.id;

        console.log("User ID from token:", userId);

        if (!userId) {
          setError("User not found");
          setLoading(false);
          return;
        }

        const ordersData = await getAllUserOrders(userId);
        setOrders(ordersData);
        console.log("Orders:", ordersData);
        setLoading(false);
      } catch (err: any) {
        console.error("Error fetching orders:", err);
        setError("Failed to fetch orders");
        setLoading(false);
      }
    }

    if (isLoggedIn) {
      fetchOrders();
    }
  }, [isLoggedIn]);

  const handleLoginRedirect = () => {
    router.push("/login");
  };

  if (loading) return <OrderSkeleton />;
  if (error && !isLoggedIn)
    return (
      <div className="flex flex-col justify-center items-center h-64 text-red-500">
        <p className="mb-4">{error}</p>
        <button
          onClick={handleLoginRedirect}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Login Now
        </button>
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center h-64 text-red-500">
        {error}
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Your Orders</h1>

      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64">
          <p className="text-gray-600 text-lg mb-4">
            You haven't placed any orders yet.
          </p>
          <button
            onClick={() => router.push("/products")}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Browse Products
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              {/* Order Header */}
              <div className="bg-gray-50 px-6 py-4 border-b flex flex-wrap justify-between items-center">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    Order #{order.id}
                  </h2>
                  <p className="text-sm text-gray-500">
                    Placed on {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center space-x-4 mt-2 md:mt-0">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      order.isPaid
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {order.isPaid ? "Paid" : "Unpaid"}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      order.isDelivered
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {order.isDelivered ? "Delivered" : "Processing"}
                  </span>
                </div>
              </div>

              <div className="p-6">
                {/* Order Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="text-md font-semibold text-gray-700 mb-2">
                      Shipping Address
                    </h3>
                    <p className="text-gray-600">{order?.user?.name}</p>
                    <p className="text-gray-600">
                      {order?.shippingAddress?.city}
                    </p>
                    <p className="text-gray-600">
                      {order?.shippingAddress?.phone}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-md font-semibold text-gray-700 mb-2">
                      Payment Information
                    </h3>
                    <p className="text-gray-600">
                      Method: {order.paymentMethodType}
                    </p>
                    <p className="text-gray-600">
                      Status: {order.isPaid ? "Paid" : "Pending"}
                    </p>
                  </div>
                </div>

                {/* Order Items */}
                <h3 className="text-md font-semibold text-gray-700 mb-4">
                  Order Items
                </h3>
                <div className="border rounded-lg overflow-hidden">
                  {order.cartItems.map((item: any, index: number) => (
                    <div
                      key={item._id}
                      className={`flex items-center p-4 ${
                        index % 2 === 0 ? "bg-gray-50" : "bg-white"
                      }`}
                    >
                      <img
                        src={item.product.imageCover}
                        alt={item.product.title}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div className="ml-4 flex-1">
                        <h4 className="font-medium text-gray-800">
                          {item.product.title}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {item.product.brand?.name || "No brand"}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-800">
                          ${item.price} x {item.count}
                        </p>
                        <p className="text-gray-600">
                          Subtotal: ${item.price * item.count}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Summary */}
                <div className="mt-6 border-t pt-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="text-gray-800">
                      $
                      {order.totalOrderPrice -
                        order.taxPrice -
                        order.shippingPrice}
                    </span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Shipping:</span>
                    <span className="text-gray-800">
                      ${order.shippingPrice}
                    </span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Tax:</span>
                    <span className="text-gray-800">${order.taxPrice}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg mt-2">
                    <span>Total:</span>
                    <span>${order.totalOrderPrice}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
