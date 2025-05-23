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

export const saveOrder = async (orderData: any) => {
  const response = await fetch(`${API_URL}/checkout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(orderData),
  });

  if (!response.ok) {
    throw new Error('Failed to save order');
  }

  return response.json();
};
