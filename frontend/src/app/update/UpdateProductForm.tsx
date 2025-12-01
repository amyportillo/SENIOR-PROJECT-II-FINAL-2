"use client";

import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { API_URL } from "@/config/api";
import { Product, ProductFormData, Message } from "@/types/product";

type UpdateProductFormProps = {
  productId: number;
  onProductUpdated?: () => void;
  onCancel?: () => void;
};

export default function UpdateProductForm({ productId, onProductUpdated, onCancel }: UpdateProductFormProps) {
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    price: "",
    description: "",
    category: "",
    image: null,
  });
  const [currentImageUrl, setCurrentImageUrl] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState<Message | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${API_URL}/products/${productId}`);
        if (!response.ok) throw new Error("Failed to fetch product");

        const product: Product = await response.json();
        setFormData({
          name: product.name,
          price: product.price.toString(),
          description: product.description || "",
          category: product.category,
          image: null,
        });
        if (product.imageUrl) setCurrentImageUrl(product.imageUrl);
      } catch (error) {
        console.error("Fetch error:", error);
        setMessage({ type: "error", text: "Failed to load product" });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

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
    return !!(formData.name && formData.price && parseFloat(formData.price) > 0 && formData.description && formData.category);
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

      const response = await fetch(`${API_URL}/products/${productId}`, {
        method: "PUT",
        body: submitData,
      });

      if (!response.ok) throw new Error("Failed to update product");

      setMessage({ type: "success", text: "Product updated successfully!" });
      onProductUpdated?.();

      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      console.error("Submission error:", error);
      setMessage({ type: "error", text: "Failed to update product" });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-3xl shadow-2xl p-12 text-center">
        <div className="inline-block w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mb-4"></div>
        <p className="text-gray-600 text-lg font-medium">Loading product...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 max-w-2xl mx-auto">
      {/* Header */}
      <div className="gradient-success p-6 relative overflow-hidden flex justify-between items-center">
        <div className="relative z-10 flex items-center gap-3">
          <div className="p-3 bg-white/20 backdrop-blur-lg rounded-xl">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </div>
          <div>
            <h2 className="text-3xl font-extrabold text-white">Update Product</h2>
            <p className="text-white/80 text-sm">Modify product details</p>
          </div>
        </div>
        
        {onCancel && (
          <button
            onClick={onCancel}
            className="relative z-10 p-2 bg-white/20 hover:bg-white/30 backdrop-blur-lg rounded-xl text-white hover:scale-110 transition-all duration-300"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
        
        <div className="absolute inset-0 opacity-20">
          <div className="absolute w-48 h-48 bg-white rounded-full -top-24 -right-24"></div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-8 space-y-6">
        {/* Name Field */}
        <div className="group">
          <label className="block text-sm font-bold mb-2 text-gray-700 flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            Product Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 outline-none transition-all duration-300 font-medium"
            placeholder="Enter product name"
            required
          />
        </div>

        {/* Price and Category Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="group">
            <label className="block text-sm font-bold mb-2 text-gray-700 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Price *
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              step="0.01"
              min="0"
              className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 outline-none transition-all duration-300 font-medium"
              placeholder="0.00"
              required
            />
          </div>

          <div className="group">
            <label className="block text-sm font-bold mb-2 text-gray-700 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              Category *
            </label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 outline-none transition-all duration-300 font-medium"
              placeholder="e.g., Electronics"
              required
            />
          </div>
        </div>

        {/* Description Field */}
        <div className="group">
          <label className="block text-sm font-bold mb-2 text-gray-700 flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Description *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 outline-none transition-all duration-300 font-medium resize-none"
            placeholder="Describe your product..."
            required
          />
        </div>

        {/* Image Upload */}
        <div className="group">
          <label className="block text-sm font-bold mb-2 text-gray-700 flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Update Image (Optional)
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 outline-none transition-all duration-300 font-medium file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 file:cursor-pointer"
          />
          <p className="text-xs text-gray-500 mt-2">Leave empty to keep current image</p>
        </div>

        {/* Image Preview */}
        {(imagePreview || currentImageUrl) && (
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border-2 border-blue-100">
            <p className="text-sm font-bold mb-3 text-gray-700 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              {imagePreview ? "New Image Preview" : "Current Image"}
            </p>
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <img src={imagePreview || currentImageUrl} alt="Preview" className="w-full h-64 object-contain bg-white" />
            </div>
          </div>
        )}

        {/* Message */}
        {message && (
          <div
            className={`p-5 rounded-2xl text-sm font-semibold flex items-center gap-3 ${
              message.type === "success"
                ? "gradient-success text-white shadow-lg"
                : "gradient-secondary text-white shadow-lg"
            }`}
          >
            {message.type === "success" ? (
              <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ) : (
              <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
            {message.text}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={!isFormValid() || isSubmitting}
            className={`flex-1 py-5 rounded-2xl font-bold text-white text-lg transition-all duration-300 flex items-center justify-center gap-3 shadow-lg ${
              !isFormValid() || isSubmitting
                ? "bg-gray-300 cursor-not-allowed"
                : "gradient-success hover:shadow-2xl hover:scale-105 active:scale-95"
            }`}
          >
            {isSubmitting ? (
              <>
                <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                Updating...
              </>
            ) : (
              <>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Update Product
              </>
            )}
          </button>
          
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-8 py-5 rounded-2xl font-bold text-gray-700 bg-gray-200 hover:bg-gray-300 transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
