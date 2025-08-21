"use client";

import Link from "next/link";
import { useState } from "react";
import { signOut, useSession, SessionProvider } from "next-auth/react";
import { FiHome, FiBox, FiLogIn, FiLogOut, FiPlusSquare } from "react-icons/fi";

// Wrap Navbar content in SessionProvider
const Navbar=()=> {
  return (
    <SessionProvider>
      <NavbarContent />
    </SessionProvider>
  );
}

function NavbarContent() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
          <FiHome /> MyStore
        </Link>

        {/* Hamburger */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-gray-800 dark:text-white text-2xl">
            {isOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Links */}
        <div className={`flex-col md:flex md:flex-row md:items-center md:space-x-6 ${isOpen ? "flex" : "hidden"} md:flex`}>
          <Link href="/" className="py-2 flex items-center gap-1 text-gray-700 dark:text-gray-200 hover:text-blue-500">
            <FiHome /> Home
          </Link>

          <Link href="/products" className="py-2 flex items-center gap-1 text-gray-700 dark:text-gray-200 hover:text-blue-500">
            <FiBox /> Products
          </Link>
          <Link href="/register" className="py-2 flex items-center gap-1 text-gray-700 dark:text-gray-200 hover:text-blue-500">
                <FiPlusSquare /> Register
              </Link>

          {!session && (
            <Link href="/login" className="py-2 flex items-center gap-1 text-gray-700 dark:text-gray-200 hover:text-blue-500">
              <FiLogIn /> Login
            </Link>
          )}

          {session && (
            <>
              <Link href="/dashboard/add-product" className="py-2 flex items-center gap-1 text-gray-700 dark:text-gray-200 hover:text-blue-500">
                <FiPlusSquare /> Dashboard
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="py-2 flex items-center gap-1 text-gray-700 dark:text-gray-200 hover:text-red-500"
              >
                <FiLogOut /> Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;