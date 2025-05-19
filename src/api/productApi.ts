const API_URL = 'http://localhost:8080';

export const fetchProducts = async () => {
  const res = await fetch(`${API_URL}/products`);
  if (!res.ok) throw new Error('Hiba a termékek lekérésekor');
  return res.json();
};
