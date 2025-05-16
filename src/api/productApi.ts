export const fetchProducts = async () => {
  const res = await fetch('http://localhost:8080/products');
  if (!res.ok) throw new Error('Hiba a termékek lekérésekor');
  return res.json();
};
