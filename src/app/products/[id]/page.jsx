"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`/api/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  if (loading) return <p className="text-center mt-10 text-lg">Loading product...</p>;
  if (!product) return <p className="text-center mt-10 text-lg">❌ Product not found.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border">
        {/* Product Image */}
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-72 object-cover"
          />
        ) : (
          <div className="w-full h-72 bg-gray-200 flex items-center justify-center text-gray-500">
            No Image Available
          </div>
        )}

        {/* Product Info */}
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
          <p className="text-gray-700 text-base mb-4">{product.description}</p>
          <p className="text-2xl font-semibold text-indigo-600 mb-6">
            ${product.price}
          </p>

          {/* Action Button */}
          <Link
            href="/products"
            className="inline-block bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            ← Back to Products
          </Link>
        </div>
      </div>
    </div>
  );
}
