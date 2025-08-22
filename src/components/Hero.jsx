"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  return (
    <div children="w-7xl mx-auto">
      <section className="relative bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-20 px-6 md:px-12 ">
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-black/30"></div>

        <div className="relative max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center md:text-left"
          >
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              Discover & Share <br />
              <span className="text-yellow-300">Amazing Products</span>
            </h1>
            <p className="mt-4 text-lg md:text-xl text-gray-200 max-w-xl">
              Join our community to explore, upvote, and review innovative
              products from creators around the world.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link
                href="/products"
                className="px-6 py-3 rounded-2xl bg-yellow-400 text-black font-semibold hover:bg-yellow-300 transition"
              >
                Explore Products
              </Link>
              <Link
                href="/register"
                className="px-6 py-3 rounded-2xl border border-white font-semibold hover:bg-white hover:text-black transition"
              >
                Get Started
              </Link>
            </div>
          </motion.div>

          {/* Right Content / Image */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-1/2"
          >
            <img
              src="https://cdn.mos.cms.futurecdn.net/v2/t:0,l:437,cw:1125,ch:1125,q:80,w:1125/KDtxxKuvtvDrxrx2ntEbWV.jpg"
              alt="Hero Illustration"
              className="w-full drop-shadow-lg"
            />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
