"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading products...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Product List</h1>
      <div className="grid gap-6 md:grid-cols-2">
        {products.map((product) => (
          <div key={product._id} className="p-6 border rounded-lg shadow">
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-gray-600 mb-2">{product.description}</p>
            <p className="font-bold mb-4">${product.price}</p>
            <Link
              href={`/products/${product._id}`}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
