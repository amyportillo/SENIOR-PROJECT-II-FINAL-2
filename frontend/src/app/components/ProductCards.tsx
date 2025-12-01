"use client";

import { useState } from "react";
import { useProducts } from "@/hooks/useProducts";
import Modal from "@/components/Modal";
import ProductImage from "@/components/ProductImage";
import UpdateProductForm from "../update/UpdateProductForm";

export default function ProductCards() {
  const { products, loading, refetch, deleteProduct } = useProducts();
  const [editingProductId, setEditingProductId] = useState<number | null>(null);

  const handleUpdateComplete = () => {
    setEditingProductId(null);
    refetch();
  };

  if (loading) return <p className="p-8 text-gray-600">Loading products...</p>;

  return (
    <>
      <Modal isOpen={!!editingProductId} onClose={() => setEditingProductId(null)}>
        {editingProductId && <UpdateProductForm productId={editingProductId} onProductUpdated={handleUpdateComplete} onCancel={() => setEditingProductId(null)} />}
      </Modal>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="overflow-hidden bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
            <div className="px-5 py-4">
              <h2 className="text-xl font-bold text-gray-800 truncate" title={product.name}>
                {product.name}
              </h2>
              <p className="text-sm text-gray-500 capitalize mt-1">{product.category || "-"}</p>
              <p className="mt-2 text-sm text-gray-600 line-clamp-2">{product.description || "No description available."}</p>
            </div>

            <div className="relative w-full h-48 bg-gray-100">
              <ProductImage imageUrl={product.imageUrl} alt={product.name} size="medium" className="w-full h-full object-cover" />
            </div>

            <div className="flex items-center justify-between px-5 py-3 bg-gray-900 mt-auto">
              <span className="text-xl font-bold text-white">${Number(product.price).toFixed(2)}</span>
              <div className="flex gap-2">
                <button onClick={() => setEditingProductId(product.id)} className="px-3 py-1.5 text-xs font-semibold uppercase bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
                  Update
                </button>
                <button onClick={() => deleteProduct(product.id, product.name)} className="px-3 py-1.5 text-xs font-semibold uppercase bg-red-500 text-white rounded hover:bg-red-600 transition-colors">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
