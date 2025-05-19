const API_URL = 'http://localhost:8080';

export async function fetchCategories() {
  const response = await fetch(`${API_URL}/categories`);
  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }
  return response.json();
}

export const fetchProducts = async () => {
  const res = await fetch(`${API_URL}/products`);
  if (!res.ok) throw new Error('Hiba a termékek lekérésekor');
  return res.json();
};

export async function fetchProductById(id: number) {
  const res = await fetch(`http://localhost:8080/products/${id}`);
  if (!res.ok) throw new Error('Hiba a termék lekérésekor');
  return res.json();
}
