"use client";

import { useState } from "react";
import ProductTable from "./components/ProductTable";
import ProductCards from "./components/ProductCards";

// main home page component
export default function Home() {
  // track whether user wants to see cards or table view
  const [viewMode, setViewMode] = useState<"table" | "cards">("cards");

  return (
    // full screen page with gradient background
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* big hero section at the top with title */}
      <div className="gradient-primary text-white py-16 px-6 relative overflow-hidden">
        {/* floating decorative circles in background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute w-96 h-96 bg-white rounded-full -top-48 -left-48 animate-float"></div>
          <div className="absolute w-96 h-96 bg-white rounded-full -bottom-48 -right-48 animate-float" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          {/* main heading and subtitle */}
          <div className="text-center mb-8">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-4 tracking-tight">
              Product Management
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Manage your inventory with style and efficiency
            </p>
          </div>

          {/* buttons to switch between card and table view */}
          <div className="flex justify-center">
            {/* glass-like toggle button container */}
            <div className="inline-flex bg-white/20 backdrop-blur-lg rounded-2xl p-1.5 shadow-2xl border border-white/30">
              {/* card view button */}
              <button
                onClick={() => setViewMode("cards")}
                className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  viewMode === "cards"
                    ? "bg-white text-purple-600 shadow-lg scale-105"
                    : "text-white hover:bg-white/10"
                }`}
              >
                <span className="flex items-center gap-2">
                  {/* grid icon */}
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                  Card View
                </span>
              </button>
              
              {/* table view button */}
              <button
                onClick={() => setViewMode("table")}
                className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  viewMode === "table"
                    ? "bg-white text-purple-600 shadow-lg scale-105"
                    : "text-white hover:bg-white/10"
                }`}
              >
                <span className="flex items-center gap-2">
                  {/* table icon */}
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Table View
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* show either product cards or table based on user choice */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div>{viewMode === "table" ? <ProductTable /> : <ProductCards />}</div>
      </div>
    </div>
  );
}
