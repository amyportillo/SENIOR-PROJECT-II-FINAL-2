"use client";

import { useState } from "react";
import { useProducts } from "@/hooks/useProducts";
import Modal from "@/components/Modal";
import ProductImage from "@/components/ProductImage";
import UpdateProductForm from "../update/UpdateProductForm";

// component that shows products as nice cards in a grid
export default function ProductCards() {
  // get products data and functions from our custom hook
  const { products, loading, refetch, deleteProduct } = useProducts();
  // track which product is being edited (null means none)
  const [editingProductId, setEditingProductId] = useState<number | null>(null);

  // after updating a product, close the modal and refresh the list
  const handleUpdateComplete = () => {
    setEditingProductId(null);
    refetch();
  };

  // show a spinning loader while products are loading
  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="inline-block w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600 text-lg font-medium">Loading amazing products...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* popup modal for editing a product */}
      <Modal isOpen={!!editingProductId} onClose={() => setEditingProductId(null)}>
        {editingProductId && <UpdateProductForm productId={editingProductId} onProductUpdated={handleUpdateComplete} onCancel={() => setEditingProductId(null)} />}
      </Modal>

      {/* grid of product cards that responds to screen size */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map((product, index) => (
          // each product card with hover animation
          <div
            key={product.id}
            className="group relative bg-white rounded-3xl overflow-hidden card-hover shadow-xl border border-gray-100"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* product image section with gradient background */}
            <div className="relative w-full h-56 bg-gradient-to-br from-purple-100 to-blue-100 overflow-hidden">
              {/* product image that zooms in on hover */}
              <ProductImage
                imageUrl={product.imageUrl}
                alt={product.name}
                size="medium"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              
              {/* category badge in top right corner */}
              <div className="absolute top-4 right-4">
                <span className="px-4 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-xs font-bold text-purple-600 uppercase tracking-wide shadow-lg">
                  {product.category || "General"}
                </span>
              </div>
            </div>

            {/* product details section */}
            <div className="p-6">
              {/* product name that changes color on hover */}
              <h2 className="text-2xl font-bold text-gray-800 mb-2 truncate group-hover:text-purple-600 transition-colors" title={product.name}>
                {product.name}
              </h2>
              
              {/* product description limited to 2 lines */}
              <p className="text-sm text-gray-600 line-clamp-2 mb-4 min-h-[40px]">
                {product.description || "No description available."}
              </p>

              {/* price displayed in a gradient badge */}
              <div className="mb-6">
                <div className="inline-block gradient-primary px-6 py-3 rounded-2xl shadow-lg">
                  <span className="text-3xl font-extrabold text-white">
                    ${Number(product.price).toFixed(2)}
                  </span>
                </div>
              </div>

              {/* edit and delete buttons */}
              <div className="flex gap-3">
                {/* edit button with blue gradient */}
                <button
                  onClick={() => setEditingProductId(product.id)}
                  className="flex-1 gradient-success text-white font-bold py-3 px-4 rounded-xl hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit
                </button>
                
                {/* delete button with pink gradient */}
                <button
                  onClick={() => deleteProduct(product.id, product.name)}
                  className="flex-1 gradient-secondary text-white font-bold py-3 px-4 rounded-xl hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Delete
                </button>
              </div>
            </div>

            {/* decorative gradient corner accent */}
            <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-purple-400/20 to-transparent rounded-br-full"></div>
          </div>
        ))}
      </div>

      {/* show this message if there are no products */}
      {products.length === 0 && (
        <div className="text-center py-20">
          <div className="inline-block p-8 bg-white rounded-3xl shadow-xl">
            <svg className="w-24 h-24 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <p className="text-xl font-semibold text-gray-600 mb-2">No products yet</p>
            <p className="text-gray-500">Start by adding your first product!</p>
          </div>
        </div>
      )}
    </>
  );
}
