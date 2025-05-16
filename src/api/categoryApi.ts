const API_BASE = 'http://localhost:3000/api';

export const fetchCategories = async () => {
  const res = await fetch(`${API_BASE}/categories`);
  if (!res.ok) throw new Error('Hiba a kategóriák lekérésekor');
  return res.json();
};
