"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ProductHighlights() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products");
        let data = await res.json();
        // Sort by price descending (highest first)
        data.sort((a, b) => b.price - a.price);
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    }
    fetchProducts();
  }, []);

  // Pagination calculations
  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = products.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(products.length / productsPerPage);

  return (
    <section className="px-6 py-12">
      <h1 className="text-3xl font-bold mb-6">✨ Product Highlights</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {currentProducts.map((product) => (
          <div
            key={product._id}
            className="p-4 border rounded-xl shadow-md hover:shadow-lg transition bg-white flex flex-col"
          >
            <img
              src={product.image || "/placeholder.png"}
              alt={product.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              {product.name}
            </h2>
            <div className="mt-auto flex items-center justify-between">
              <p className="text-lg font-bold text-indigo-600">
                ${product.price}
              </p>
              <Link
                href={`/products/${product._id}`}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
              >
                🔍 Details
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

      {/* All Products Link */}
      <div className="text-center mt-6">
        <Link
          href="/products"
          className="text-indigo-600 font-semibold hover:underline"
        >
          See All Products →
        </Link>
      </div>
    </section>
  );
}
