import AddProductForm from "./AddProductForm";

export default function ProductAdd() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-8 md:p-12">
      <div className="max-w-3xl mx-auto">
        <AddProductForm />
      </div>
    </div>
  );
}
