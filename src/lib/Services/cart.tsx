"use server";
import { cookies } from "next/headers";
 
export async function getLoggedUserCart() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://ecommerce.routemisr.com/api/v1';
    const response = await fetch(`${baseUrl}/cart`, {
      headers: {
        "Content-Type": "application/json",
        token: (await cookies()).get("token")?.value || "",
      },
    });
    
    if (!response.ok) {
      return { error: response.statusText || "Failed to fetch cart" };
    }
    
    return await response.json();
  } catch (err: any) {
    return { error: err.message };
  }
}

//  Add product to cart
export async function addProductToCart(id: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://ecommerce.routemisr.com/api/v1';
    const response = await fetch(`${baseUrl}/cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: (await cookies()).get("token")?.value || "",
      },
      body: JSON.stringify({ productId: id }),
    });
    
    if (!response.ok) {
      return { error: response.statusText || "Failed to add product to cart" };
    }
    
    return await response.json();
  } catch (err: any) {
    return { error: err.message };
  }
}

//  Delete product from cart
export async function deleteProductFromCart(id: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://ecommerce.routemisr.com/api/v1';
    const response = await fetch(
      `${baseUrl}/cart/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          token: (await cookies()).get("token")?.value || "",
        },
      }
    );
    
    if (!response.ok) {
      return { error: response.statusText || "Failed to delete product from cart" };
    }
    
    return await response.json();
  } catch (err: any) {
    return { error: err.message };
  }
}

//  Update product quantity in cart
export async function updateQuantityProduct(id: string, count: number) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://ecommerce.routemisr.com/api/v1';
    const response = await fetch(
      `${baseUrl}/cart/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: (await cookies()).get("token")?.value || "",
        },
        body: JSON.stringify({ count }),
      }
    );
    
    if (!response.ok) {
      return { error: response.statusText || "Failed to update product quantity" };
    }
    
    return await response.json();
  } catch (err: any) {
    return { error: err.message };
  }
}
export async function deleteAllProductFromCart() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/cart`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          token: (await cookies()).get("token")?.value || "",
        },
      }
    );
    
    if (!response.ok) {
      return { error: response.statusText || "Failed to delete all products from cart" };
    }
    
    return await response.json();
  } catch (err: any) {
    return { error: err.message };
  }
}
 