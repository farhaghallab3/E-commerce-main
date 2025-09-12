"use server";
import { cookies } from "next/headers";

export async function addProductToWishlist(id: string) {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL ||
      "https://ecommerce.routemisr.com/api/v1";
    const response = await fetch(`${baseUrl}/wishlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: (await cookies()).get("token")?.value || "",
      },
      body: JSON.stringify({ productId: id }),
    });

    if (!response.ok) {
      return {
        error: response.statusText || "Failed to add product to wishlist",
      };
    }

    const result = await response.json();
    return result;
  } catch (err: any) {
    return { error: err.message };
  }
}
export async function getLoggedUserWishlist() {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL ||
      "https://ecommerce.routemisr.com/api/v1";
    const response = await fetch(`${baseUrl}/wishlist`, {
      headers: {
        "Content-Type": "application/json",
        token: (await cookies()).get("token")?.value || "",
      },
    });

    if (!response.ok) {
      return { error: response.statusText || "Failed to fetch wishlist" };
    }

    const result = await response.json();
    return result;
  } catch (err: any) {
    return { error: err.message };
  }
}
export async function deleteProductFromWishlist(id: string) {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL ||
      "https://ecommerce.routemisr.com/api/v1";
    const response = await fetch(`${baseUrl}/wishlist/${id}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        token: (await cookies()).get("token")?.value || "",
      },
    });

    if (!response.ok) {
      return {
        error: response.statusText || "Failed to delete product from wishlist",
      };
    }

    const result = await response.json();
    return result;
  } catch (err: any) {
    return { error: err.message };
  }
}
