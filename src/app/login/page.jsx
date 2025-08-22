"use client";
import { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export default function LoginPage() {
  const { data: session } = useSession();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const response = await signIn("credentials", {
      email,
      password,
      redirect: false, // prevent auto redirect
    });

    setLoading(false);

    if (response?.error) {
      MySwal.fire({
        icon: "error",
        title: "Login failed",
        text: "Invalid email or password",
      });
    } else {
      MySwal.fire({
        icon: "success",
        title: "Welcome back!",
        text: "You have logged in successfully",
        timer: 1500,
        showConfirmButton: false,
      });
      router.push("/products");
    }
  };

  // ✅ Only redirect manually if user logs in, not on refresh
  if (session) {
    router.push("/products");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 dark:bg-gray-900 p-4">
      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-10 w-full max-w-md">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-white">
          Sign in to your account
        </h1>

        {/* Credentials Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            placeholder="Email"
            name="email"
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
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-300 dark:border-gray-600" />
          <span className="px-3 text-gray-500 dark:text-gray-400">Or continue with</span>
          <hr className="flex-grow border-gray-300 dark:border-gray-600" />
        </div>

        {/* Google Login */}
        <button
          onClick={() => signIn("google", { callbackUrl: "/products" })}
          className="w-full flex justify-center items-center py-3 border rounded-lg bg-white hover:bg-gray-100 transition-colors"
        >
          <img
            src="https://www.svgrepo.com/show/355037/google.svg"
            className="w-5 h-5 mr-2"
            alt="Google"
          />
          <span className="text-gray-700 dark:text-gray-200 font-medium">
            Sign in with Google
          </span>
        </button>
      </div>
    </div>
  );
}
