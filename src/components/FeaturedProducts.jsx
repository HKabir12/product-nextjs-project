"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();

        // Filter featured products only
        const featured = data.filter((p) => p.isFeatured);
        setProducts(featured);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading featured products...</p>;
  if (!products.length) return <p className="text-center mt-10">No featured products yet.</p>;

  return (
    <section className="px-6 py-12">
      <h1 className="text-3xl font-bold mb-6">Featured Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="p-4 border rounded-xl shadow-md hover:shadow-lg transition"
          >
            <img
              src={product.image || "/placeholder.png"}
              alt={product.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-lg font-bold text-indigo-600">${product.price}</p>
            <Link
              href={`/products/${product._id}`}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition mt-2 inline-block"
            >
              Details
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
