"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { API_URL } from "@/config/api";
import { ProductFormData, Message } from "@/types/product";

type AddProductFormProps = {
  onProductAdded?: () => void;
};

// form component for adding a new product
export default function AddProductForm({ onProductAdded }: AddProductFormProps) {
  // keep track of all form fields
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    price: "",
    description: "",
    category: "",
    image: null,
  });
  // preview url for the selected image
  const [imagePreview, setImagePreview] = useState("");
  // prevent double submissions
  const [isSubmitting, setIsSubmitting] = useState(false);
  // success or error message to show user
  const [message, setMessage] = useState<Message | null>(null);

  // update form fields when user types
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // handle image file selection and preview
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // make sure it's actually an image
    if (!file.type.startsWith("image/")) {
      setMessage({ type: "error", text: "Please upload a valid image" });
      return;
    }

    setFormData((prev) => ({ ...prev, image: file }));

    // create preview url for the image
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  // check if all required fields are filled
  const isFormValid = () => {
    return !!(formData.name && formData.price && parseFloat(formData.price) > 0 && formData.description && formData.category && formData.image);
  };

  // submit the form to create a new product
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isFormValid()) return;

    setIsSubmitting(true);

    try {
      // prepare form data with file upload
      const submitData = new FormData();
      submitData.append("name", formData.name);
      submitData.append("price", formData.price);
      submitData.append("description", formData.description);
      submitData.append("category", formData.category);
      if (formData.image) submitData.append("image", formData.image);

      // send to backend api
      const response = await fetch(`${API_URL}/products`, {
        method: "POST",
        body: submitData,
      });

      if (!response.ok) throw new Error("Failed to add product");

      const data = await response.json();
      setMessage({ type: "success", text: `Product added successfully! ID: ${data.id}` });

      // clear the form for next product
      setFormData({ name: "", price: "", description: "", category: "", image: null });
      setImagePreview("");
      onProductAdded?.();

      // hide success message after 5 seconds
      setTimeout(() => setMessage(null), 5000);
    } catch (error) {
      console.error("Submission error:", error);
      setMessage({ type: "error", text: "Failed to add product" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
      {/* fancy gradient header with floating circles */}
      <div className="gradient-primary p-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute w-64 h-64 bg-white rounded-full -top-32 -left-32 animate-float"></div>
          <div className="absolute w-64 h-64 bg-white rounded-full -bottom-32 -right-32 animate-float" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="relative z-10">
          {/* plus icon in a frosted glass box */}
          <div className="inline-block p-4 bg-white/20 backdrop-blur-lg rounded-2xl mb-4">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <h2 className="text-4xl font-extrabold text-white mb-2">Add New Product</h2>
          <p className="text-white/80">Fill in the details to create a new product</p>
        </div>
      </div>

      {/* the actual form fields */}
      <form onSubmit={handleSubmit} className="p-8 space-y-6">
        {/* product name input */}
        <div className="group">
          <label className="block text-sm font-bold mb-2 text-gray-700 flex items-center gap-2">
            <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            Product Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 outline-none transition-all duration-300 font-medium"
            placeholder="Enter product name"
            required
          />
        </div>

        {/* two column layout for price and category */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* price input with money icon */}
          <div className="group">
            <label className="block text-sm font-bold mb-2 text-gray-700 flex items-center gap-2">
              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 outline-none transition-all duration-300 font-medium"
              placeholder="0.00"
              required
            />
          </div>

          {/* category input with tag icon */}
          <div className="group">
            <label className="block text-sm font-bold mb-2 text-gray-700 flex items-center gap-2">
              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              Category *
            </label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 outline-none transition-all duration-300 font-medium"
              placeholder="e.g., Electronics"
              required
            />
          </div>
        </div>

        {/* description text area with document icon */}
        <div className="group">
          <label className="block text-sm font-bold mb-2 text-gray-700 flex items-center gap-2">
            <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Description *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 outline-none transition-all duration-300 font-medium resize-none"
            placeholder="Describe your product in detail..."
            required
          />
        </div>

        {/* image file upload with custom file button style */}
        <div className="group">
          <label className="block text-sm font-bold mb-2 text-gray-700 flex items-center gap-2">
            <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Product Image *
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 outline-none transition-all duration-300 font-medium file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100 file:cursor-pointer"
            required
          />
        </div>

        {/* show image preview if user selected a file */}
        {imagePreview && (
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-6 border-2 border-purple-100">
            <p className="text-sm font-bold mb-3 text-gray-700 flex items-center gap-2">
              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              Preview
            </p>
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <img src={imagePreview} alt="Preview" className="w-full h-64 object-contain bg-white" />
            </div>
          </div>
        )}

        {/* success or error message banner */}
        {message && (
          <div
            className={`p-5 rounded-2xl text-sm font-semibold flex items-center gap-3 animate-in slide-in-from-top ${
              message.type === "success"
                ? "gradient-success text-white shadow-lg"
                : "gradient-secondary text-white shadow-lg"
            }`}
          >
            {/* show checkmark for success, warning icon for error */}
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

        {/* submit button that gets disabled if form incomplete or submitting */}
        <button
          type="submit"
          disabled={!isFormValid() || isSubmitting}
          className={`w-full py-5 rounded-2xl font-bold text-white text-lg transition-all duration-300 flex items-center justify-center gap-3 shadow-lg ${
            !isFormValid() || isSubmitting
              ? "bg-gray-300 cursor-not-allowed"
              : "gradient-primary hover:shadow-2xl hover:scale-105 active:scale-95"
          }`}
        >
          {/* show spinner when submitting, plus icon when ready */}
          {isSubmitting ? (
            <>
              <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
              Adding Product...
            </>
          ) : (
            <>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Product
            </>
          )}
        </button>
      </form>
    </div>
  );
}
