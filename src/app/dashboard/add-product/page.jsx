"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export default function AddProductPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  // Redirect if not logged in
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description, price, image }),
      });

      const data = await res.json();

      if (res.ok) {
        MySwal.fire({
          icon: "success",
          title: "Product Added!",
          text: data.message || "Your product was added successfully.",
          timer: 1800,
          showConfirmButton: false,
        });
        setName("");
        setDescription("");
        setPrice("");
        setImage("");
      } else {
        MySwal.fire({
          icon: "error",
          title: "Oops...",
          text: data.message || "Failed to add product.",
        });
      }
    } catch (error) {
      MySwal.fire({
        icon: "error",
        title: "Error!",
        text: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading")
    return <p className="text-center mt-10">Checking authentication...</p>;
  if (status === "unauthenticated") return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 dark:bg-gray-900 p-6">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8 w-full max-w-lg">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">
          Add New Product
        </h1>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <input
            type="text"
            name="text"
            placeholder="Product Name"
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none dark:bg-gray-700 dark:text-white"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <textarea
            placeholder="Description"
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none dark:bg-gray-700 dark:text-white"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <input
            type="number"
            placeholder="Price"
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none dark:bg-gray-700 dark:text-white"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />

          <input
            type="url"
            name="URL"
            placeholder="Image URL"
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none dark:bg-gray-700 dark:text-white"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50"
          >
            {loading ? "Adding..." : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
}
