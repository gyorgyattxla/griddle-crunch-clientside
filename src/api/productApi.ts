const API_BASE = 'http://localhost:3000/api';

export const fetchProducts = async () => {
  const res = await fetch(`${API_BASE}/products`);
  if (!res.ok) throw new Error('Hiba a termékek lekérésekor');
  return res.json();
};
