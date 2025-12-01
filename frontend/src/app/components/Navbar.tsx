"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// main navigation bar component
export default function Navbar() {
  // get current page path to highlight active link
  const pathname = usePathname();

  // check if a link is the current page
  const isActive = (path: string) => pathname === path;

  return (
    // navigation bar with gradient background that sticks to top
    <nav className="gradient-primary sticky top-0 z-50 shadow-2xl">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* logo and site name on the left */}
          <Link href="/" className="flex items-center gap-3 group">
            {/* 3d cube icon that rotates on hover */}
            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-lg flex items-center justify-center transform group-hover:scale-110 transition-all duration-300 group-hover:rotate-12">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            {/* site name and subtitle */}
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">ProductHub</h1>
              <p className="text-xs text-white/70">Management System</p>
            </div>
          </Link>

          {/* navigation links on the right side */}
          <div className="flex items-center gap-2">
            {/* home link - changes style when active */}
            <Link
              href="/"
              className={`relative px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 ${
                isActive("/")
                  ? "bg-white text-purple-600 shadow-lg scale-105"
                  : "text-white hover:bg-white/20 hover:scale-105"
              }`}
            >
              <span className="flex items-center gap-2">
                {/* house icon */}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Home
              </span>
            </Link>

            {/* add product link - changes style when active */}
            <Link
              href="/add"
              className={`relative px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 ${
                isActive("/add")
                  ? "bg-white text-purple-600 shadow-lg scale-105"
                  : "text-white hover:bg-white/20 hover:scale-105"
              }`}
            >
              <span className="flex items-center gap-2">
                {/* plus icon */}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Product
              </span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
