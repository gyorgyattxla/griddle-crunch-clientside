import React, { useEffect, useState } from 'react';

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [categories, setCategories] = useState<any>(null);


    useEffect(() => {
        fetch('http://localhost:8080/categories', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                if (!res.ok) throw new Error('Failed to fetch /CATEGORIES API.');
                return res.json();
            })
            .then(data => {
            setCategories(data);
            setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

export async function fetchCategories() {
  const response = await fetch('http://localhost:8080/categories');
  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }
  return response.json();
}
