export async function fetchCategories() {
  const response = await fetch('http://localhost:8080/categories');
  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }
  return response.json();
}
