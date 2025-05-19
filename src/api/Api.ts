export async function fetchCategories() {
  const response = await fetch('http://localhost:8080/categories');
  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }
  return response.json();
}

export const fetchProducts = async () => {
  const res = await fetch('http://localhost:8080/products');
  if (!res.ok) throw new Error('Hiba a termékek lekérésekor');
  return res.json();
};
