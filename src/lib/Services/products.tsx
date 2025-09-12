export async function getAllProducts() {
  try {
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/products",
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      return { error: response.statusText || "Failed to fetch products" };
    }

    const { data } = await response.json();
    return { data };
  } catch (err: any) {
    return { error: err.message || "Something went wrong" };
  }
}
export async function sort() {
  try {
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/products?sort=-price"
    );

    if (!response.ok) {
      return {
        error: response.statusText || "Failed to fetch sorted products",
      };
    }

    const { data } = await response.json();

    return { data };
  } catch (err: any) {
    return { error: err.message || "Something went wrong" };
  }
}
export async function getProductDetails(id: string) {
  try {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`
    );

    if (!response.ok) {
      return {
        error: response.statusText || "Failed to fetch product details",
      };
    }

    const { data } = await response.json();
    return { data };
  } catch (err: any) {
    return { error: err.message || "Something went wrong" };
  }
}
