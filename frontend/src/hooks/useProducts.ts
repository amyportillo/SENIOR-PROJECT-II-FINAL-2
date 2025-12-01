import { useState, useEffect } from "react";
import { API_URL } from "@/config/api";
import { Product } from "@/types/product";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/products`);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = async (id: number, name: string): Promise<boolean> => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) {
      return false;
    }

    try {
      const response = await fetch(`${API_URL}/products/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete product");

      await fetchProducts();
      return true;
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete product");
      return false;
    }
  };

  return { products, loading, refetch: fetchProducts, deleteProduct };
}
