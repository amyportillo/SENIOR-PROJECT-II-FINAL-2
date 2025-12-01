export type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  description?: string;
  image?: string;
  imageUrl?: string;
};

export type ProductFormData = {
  name: string;
  price: string;
  description: string;
  category: string;
  image: File | null;
};

export type Message = {
  type: "success" | "error";
  text: string;
};
