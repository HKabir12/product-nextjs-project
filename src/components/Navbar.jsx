"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import {
  FiHome,
  FiBox,
  FiLogIn,
  FiLogOut,
  FiPlusSquare,
  FiChevronDown,
} from "react-icons/fi";
import { BsSun, BsMoon } from "react-icons/bs";

function Navbar() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const pathname = usePathname();
  const userImage = session?.user?.image || "/mock-avatar.png";

  // Hydration fix
  useEffect(() => setMounted(true), []);

  // helper function for active links
  const linkClasses = (path) =>
    `flex items-center gap-1 px-3 py-2 rounded-md transition ${
      pathname === path
        ? "bg-blue-500 text-white"
        : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
    }`;

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2"
        >
          <FiHome /> NextProductHub
        </Link>

        {/* Hamburger (Mobile) */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-800 dark:text-white text-2xl"
          >
            {isOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Nav Links */}
        <div
          className={`flex-col md:flex md:flex-row md:items-center md:space-x-6 w-full md:w-auto md:justify-center ${
            isOpen ? "flex mt-4" : "hidden"
          } md:flex`}
        >
          <div className="flex flex-col md:flex-row md:space-x-6 flex-grow justify-center">
            <Link href="/" className={linkClasses("/")}>
              <FiHome /> Home
            </Link>

            <Link href="/products" className={linkClasses("/products")}>
              <FiBox /> Products
            </Link>
          </div>

          {/* Right side section */}
          <div className="flex flex-col md:flex-row md:items-center md:space-x-4 mt-4 md:mt-0 md:ml-auto">
            {/* 🌗 Theme Toggle */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {theme === "dark" ? (
                  <BsSun className="text-xl" />
                ) : (
                  <BsMoon className="text-xl" />
                )}
              </button>
            )}

            {!session && (
              <>
                <Link href="/register" className={linkClasses("/register")}>
                  <FiPlusSquare /> Register
                </Link>
                <Link href="/login" className={linkClasses("/login")}>
                  <FiLogIn /> Login
                </Link>
              </>
            )}

            {session && (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <img
                    src={userImage}
                    alt="User Avatar"
                    className="w-8 h-8 rounded-full object-cover border border-gray-300 dark:border-gray-600"
                  />
                  <FiChevronDown />
                </button>

                {/* Dropdown */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-gray-800 shadow-lg rounded-md py-2 z-50">
                    <div className="px-4 py-2 text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700">
                      <p className="font-semibold">{session.user.name}</p>
                      <p className="text-sm">{session.user.email}</p>
                    </div>
                    <Link
                      href="/dashboard/add-product"
                      className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={() => signOut({ callbackUrl: "/" })}
                      className="w-full text-left px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <FiLogOut className="inline mr-2" /> Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
