"use client"

import Link from "next/link"
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* About Section */}
        <div>
          <h2 className="text-xl font-bold text-white mb-4">MyStore</h2>
          <p className="text-gray-400">
            MyStore is a simple Next.js app showcasing products with public and protected pages.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h2 className="text-xl font-bold text-white mb-4">Quick Links</h2>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="hover:text-blue-500">Home</Link>
            </li>
            <li>
              <Link href="/products" className="hover:text-blue-500">Products</Link>
            </li>
            <li>
              <Link href="/login" className="hover:text-blue-500">Login</Link>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h2 className="text-xl font-bold text-white mb-4">Follow Us</h2>
          <div className="flex space-x-4 text-gray-400">
            <Link href="#" className="hover:text-blue-500"><FaFacebook size={20} /></Link>
            <Link href="#" className="hover:text-blue-400"><FaTwitter size={20} /></Link>
            <Link href="#" className="hover:text-pink-500"><FaInstagram size={20} /></Link>
          </div>
        </div>

      </div>

      <div className="mt-8 border-t border-gray-700 pt-4 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} MyStore. All rights reserved.
      </div>
    </footer>
  )
}
