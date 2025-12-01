import AddProductForm from "./AddProductForm";

export default function ProductAdd() {
  return (
    <div className="min-h-screen bg-gray-50 p-8 md:p-12 text-center">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Add New Product</h1>
      {/* AddProductForm Component */}
      <div className="max-w-2xl mx-auto">
        <AddProductForm />
      </div>
    </div>
  );
}
