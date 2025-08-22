"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        MySwal.fire({
          icon: "success",
          title: "Registration Successful 🎉",
          text: data.message || "You can now log in to your account.",
          timer: 2000,
          showConfirmButton: false,
        });
        setName("");
        setEmail("");
        setPassword("");
        setTimeout(() => router.push("/login"), 2000);
      } else {
        MySwal.fire({
          icon: "error",
          title: "Registration Failed ❌",
          text: data.message || "Something went wrong. Please try again.",
        });
      }
    } catch (error) {
      MySwal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 dark:bg-gray-900 p-4">
      <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-xl p-10 w-full max-w-md">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-white">
          Create your account
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none dark:bg-gray-700 dark:text-white"
          />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none dark:bg-gray-700 dark:text-white"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none dark:bg-gray-700 dark:text-white"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600 dark:text-gray-300">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-indigo-600 hover:text-indigo-800 font-medium"
          >
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}
