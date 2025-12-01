"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { API_URL } from "@/config/api";
import { ProductFormData, Message } from "@/types/product";

type AddProductFormProps = {
  onProductAdded?: () => void;
};

const INPUT_CLASS = "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm";

export default function AddProductForm({ onProductAdded }: AddProductFormProps) {
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    price: "",
    description: "",
    category: "",
    image: null,
  });
  const [imagePreview, setImagePreview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<Message | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setMessage({ type: "error", text: "Please upload a valid image" });
      return;
    }

    setFormData((prev) => ({ ...prev, image: file }));

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const isFormValid = () => {
    return !!(formData.name && formData.price && parseFloat(formData.price) > 0 && formData.description && formData.category && formData.image);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isFormValid()) return;

    setIsSubmitting(true);

    try {
      const submitData = new FormData();
      submitData.append("name", formData.name);
      submitData.append("price", formData.price);
      submitData.append("description", formData.description);
      submitData.append("category", formData.category);
      if (formData.image) submitData.append("image", formData.image);

      const response = await fetch(`${API_URL}/products`, {
        method: "POST",
        body: submitData,
      });

      if (!response.ok) throw new Error("Failed to add product");

      const data = await response.json();
      setMessage({ type: "success", text: `Product added! ID: ${data.id}` });

      // Reset form
      setFormData({ name: "", price: "", description: "", category: "", image: null });
      setImagePreview("");
      onProductAdded?.();

      setTimeout(() => setMessage(null), 5000);
    } catch (error) {
      console.error("Submission error:", error);
      setMessage({ type: "error", text: "Failed to add product" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Product</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">Name *</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} className={INPUT_CLASS} placeholder="Product name" required />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">Price *</label>
          <input type="number" name="price" value={formData.price} onChange={handleChange} step="0.01" min="0" className={INPUT_CLASS} placeholder="0.00" required />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">Category *</label>
          <input type="text" name="category" value={formData.category} onChange={handleChange} className={INPUT_CLASS} placeholder="e.g., electronics" required />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">Description *</label>
          <textarea name="description" value={formData.description} onChange={handleChange} rows={4} className={INPUT_CLASS} placeholder="Product description" required />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">Image *</label>
          <input type="file" accept="image/*" onChange={handleImageChange} className={INPUT_CLASS} required />
        </div>

        {imagePreview && (
          <div>
            <p className="text-sm font-medium mb-2 text-gray-700">Preview:</p>
            <img src={imagePreview} alt="Preview" className="w-full h-48 object-contain border border-gray-300 rounded-md bg-gray-50" />
          </div>
        )}

        {message && <div className={`p-3 rounded-md text-sm ${message.type === "success" ? "bg-green-50 text-green-800 border border-green-200" : "bg-red-50 text-red-800 border border-red-200"}`}>{message.text}</div>}

        <button type="submit" disabled={!isFormValid() || isSubmitting} className={`w-full py-3 rounded-md font-semibold text-white transition-colors ${!isFormValid() || isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800"}`}>
          {isSubmitting ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
}
