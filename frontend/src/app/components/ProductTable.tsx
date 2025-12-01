"use client";

import { useState } from "react";
import { useProducts } from "@/hooks/useProducts";
import Modal from "@/components/Modal";
import ProductImage from "@/components/ProductImage";
import UpdateProductForm from "../update/UpdateProductForm";

export default function ProductTable() {
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

      <div className="container px-4 mx-auto">
        <div className="overflow-x-auto border border-gray-200 rounded-lg mt-6">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-12 py-3.5 text-sm font-normal text-gray-500">
                  Image
                </th>
                <th scope="col" className="px-12 py-3.5 text-sm font-normal text-gray-500">
                  Name
                </th>
                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-gray-500">
                  Category
                </th>
                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-gray-500">
                  Price
                </th>
                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-gray-500">
                  Description
                </th>
                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 text-sm whitespace-nowrap">
                    <div className="flex justify-center">
                      <ProductImage imageUrl={product.imageUrl} alt={product.name} size="small" />
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm whitespace-nowrap">{product.name}</td>
                  <td className="px-4 py-4 text-sm whitespace-nowrap capitalize">{product.category || "-"}</td>
                  <td className="px-4 py-4 text-sm whitespace-nowrap text-right">${Number(product.price).toFixed(2)}</td>
                  <td className="px-4 py-4 text-sm whitespace-nowrap">{product.description || "-"}</td>
                  <td className="px-4 py-4 text-sm whitespace-nowrap">
                    <div className="flex gap-2 justify-center">
                      <button onClick={() => setEditingProductId(product.id)} className="px-3 py-1 text-xs font-semibold text-white bg-blue-500 rounded hover:bg-blue-600 transition-colors">
                        Update
                      </button>
                      <button onClick={() => deleteProduct(product.id, product.name)} className="px-3 py-1 text-xs font-semibold text-white bg-red-500 rounded hover:bg-red-600 transition-colors">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
