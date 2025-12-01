import { Request, Response } from "express";
import { Product } from "../models/Product";

export const getAllProducts = async (req: Request, res: Response) => {
  const products = await Product.findAll();
  res.json(products);
};

export const getProductById = async (req: Request, res: Response) => {
  const product = await Product.findByPk(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: "Product not found" });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ error: "Image file is required" });
  }
  const newProduct = await Product.create({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: req.file.filename,
  });
  res.status(201).json(newProduct);
};

export const updateProduct = async (req: Request, res: Response) => {
  const product = await Product.findByPk(req.params.id);
  if (product) {
    const updateData: any = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
    };

    // Only update image if a new one was uploaded
    if (req.file) {
      updateData.image = req.file.filename;
    }

    await product.update(updateData);
    res.json(product);
  } else {
    res.status(404).json({ error: "Product not found" });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  const product = await Product.findByPk(req.params.id);
  if (product) {
    await product.destroy();
    res.status(204).end();
  } else {
    res.status(404).json({ error: "Product not found" });
  }
};
