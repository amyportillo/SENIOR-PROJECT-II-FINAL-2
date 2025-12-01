"use client";

import { useState } from "react";
import { useProducts } from "@/hooks/useProducts";
import Modal from "@/components/Modal";
import ProductImage from "@/components/ProductImage";
import UpdateProductForm from "../update/UpdateProductForm";

// component that shows products in a table format
export default function ProductTable() {
  // get products data and functions from our custom hook
  const { products, loading, refetch, deleteProduct } = useProducts();
  // track which product is being edited
  const [editingProductId, setEditingProductId] = useState<number | null>(null);

  // after updating, close modal and refresh list
  const handleUpdateComplete = () => {
    setEditingProductId(null);
    refetch();
  };

  // show loading spinner while fetching products
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
      {/* popup modal for editing products */}
      <Modal isOpen={!!editingProductId} onClose={() => setEditingProductId(null)}>
        {editingProductId && <UpdateProductForm productId={editingProductId} onProductUpdated={handleUpdateComplete} onCancel={() => setEditingProductId(null)} />}
      </Modal>

      {/* table container with rounded corners and shadow */}
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            {/* table header with gradient background */}
            <thead>
              <tr className="gradient-primary text-white">
                {/* image column header */}
                <th scope="col" className="px-6 py-5 text-left text-sm font-bold uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Image
                  </div>
                </th>
                {/* product name column header */}
                <th scope="col" className="px-6 py-5 text-left text-sm font-bold uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    Product Name
                  </div>
                </th>
                {/* category column header */}
                <th scope="col" className="px-6 py-5 text-left text-sm font-bold uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    Category
                  </div>
                </th>
                {/* price column header */}
                <th scope="col" className="px-6 py-5 text-left text-sm font-bold uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Price
                  </div>
                </th>
                {/* description column header */}
                <th scope="col" className="px-6 py-5 text-left text-sm font-bold uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Description
                  </div>
                </th>
                {/* actions column header for edit/delete buttons */}
                <th scope="col" className="px-6 py-5 text-center text-sm font-bold uppercase tracking-wider">
                  <div className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Actions
                  </div>
                </th>
              </tr>
            </thead>
            {/* table body with dividing lines between rows */}
            <tbody className="divide-y divide-gray-100">
              {/* loop through each product and create a table row */}
              {products.map((product, index) => (
                <tr 
                  key={product.id} 
                  className={`transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 ${
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                  }`}
                >
                  {/* product image cell */}
                  <td className="px-6 py-5">
                    <div className="flex justify-center">
                      <div className="relative w-16 h-16 rounded-2xl overflow-hidden shadow-lg ring-2 ring-purple-100 group-hover:ring-purple-300 transition-all">
                        <ProductImage imageUrl={product.imageUrl} alt={product.name} size="small" className="w-full h-full object-cover" />
                      </div>
                    </div>
                  </td>
                  {/* product name cell */}
                  <td className="px-6 py-5">
                    <span className="text-sm font-bold text-gray-800">{product.name}</span>
                  </td>
                  {/* category badge cell */}
                  <td className="px-6 py-5">
                    <span className="inline-flex px-3 py-1 text-xs font-bold rounded-full bg-purple-100 text-purple-700 capitalize">
                      {product.category || "General"}
                    </span>
                  </td>
                  {/* price with gradient text cell */}
                  <td className="px-6 py-5">
                    <span className="text-lg font-extrabold text-purple-600">
                      ${Number(product.price).toFixed(2)}
                    </span>
                  </td>
                  {/* description limited to 2 lines */}
                  <td className="px-6 py-5">
                    <span className="text-sm text-gray-600 line-clamp-2 max-w-xs">
                      {product.description || "No description"}
                    </span>
                  </td>
                  {/* edit and delete action buttons */}
                  <td className="px-6 py-5">
                    <div className="flex gap-2 justify-center">
                      {/* blue edit button */}
                      <button
                        onClick={() => setEditingProductId(product.id)}
                        className="gradient-success text-white font-bold py-2 px-4 rounded-xl hover:shadow-lg transform hover:scale-110 transition-all duration-300 flex items-center gap-1"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Edit
                      </button>
                      {/* pink delete button */}
                      <button
                        onClick={() => deleteProduct(product.id, product.name)}
                        className="gradient-secondary text-white font-bold py-2 px-4 rounded-xl hover:shadow-lg transform hover:scale-110 transition-all duration-300 flex items-center gap-1"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* show this message if no products exist */}
        {products.length === 0 && (
          <div className="text-center py-20">
            <svg className="w-24 h-24 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <p className="text-xl font-semibold text-gray-600 mb-2">No products yet</p>
            <p className="text-gray-500">Start by adding your first product!</p>
          </div>
        )}
      </div>
    </>
  );
}
