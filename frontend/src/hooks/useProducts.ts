import { useState, useEffect } from "react";
import { API_URL } from "@/config/api";
import { Product } from "@/types/product";

// custom hook for managing products data
export function useProducts() {
  // store list of products
  const [products, setProducts] = useState<Product[]>([]);
  // track loading state
  const [loading, setLoading] = useState(true);

  // fetch all products from the api
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

  // load products when component first mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  // delete a product after user confirms
  const deleteProduct = async (id: number, name: string): Promise<boolean> => {
    // show confirmation dialog
    if (!confirm(`Are you sure you want to delete "${name}"?`)) {
      return false;
    }

    try {
      // send delete request to api
      const response = await fetch(`${API_URL}/products/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete product");

      // refresh products list after deletion
      await fetchProducts();
      return true;
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete product");
      return false;
    }
  };

  // return everything components need
  return { products, loading, refetch: fetchProducts, deleteProduct };
}
