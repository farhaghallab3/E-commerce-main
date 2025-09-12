export async function getAllBrands() {
  try {
    const response = await fetch("https://ecommerce.routemisr.com/api/v1/brands");

    if (!response.ok) {
      return { error: response.statusText };
    }

    const { data } = await response.json();
    return { data }; 
  } catch (err: any) {
    return { error: err.message };
  }
}
 