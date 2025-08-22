"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ProductHighlights() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    }
    fetchProducts();
  }, []);

  return (
    <section className="px-6 py-12">
      <h1 className="text-3xl font-bold mb-6">✨ Product Highlights</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="p-4 border rounded-xl shadow-md hover:shadow-lg transition bg-white flex flex-col"
          >
            {/* Image */}
            <img
              src={product.image || "/placeholder.png"}
              alt={product.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />

            {/* Product Info */}
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              {product.name}
            </h2>

            {/* Bottom Row: Price (left) + Button (right) */}
            <div className="mt-auto flex items-center justify-between">
              <p className="text-lg font-bold text-indigo-600">
                ${product.price}
              </p>
              <Link
                href={`/products/${product._id}`}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
              >
                Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
