"use client";

import { useState } from "react";
import ProductTable from "./components/ProductTable";
import ProductCards from "./components/ProductCards";

export default function Home() {
  const [viewMode, setViewMode] = useState<"table" | "cards">("cards");

  return (
    <div className="min-h-screen bg-gray-50 p-8 md:p-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Product Management</h1>

          <div className="flex bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
            <button onClick={() => setViewMode("table")} className={`px-6 py-2.5 text-sm font-semibold transition-colors ${viewMode === "table" ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50"}`}>
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Table
              </span>
            </button>
            <button onClick={() => setViewMode("cards")} className={`px-6 py-2.5 text-sm font-semibold transition-colors ${viewMode === "cards" ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50"}`}>
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                Cards
              </span>
            </button>
          </div>
        </div>

        <div>{viewMode === "table" ? <ProductTable /> : <ProductCards />}</div>
      </div>
    </div>
  );
}
