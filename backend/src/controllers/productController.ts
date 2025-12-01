import { Request, Response } from "express";
import { Product } from "../models/Product";

// get all products from database and return as json
export const getAllProducts = async (req: Request, res: Response) => {
  const products = await Product.findAll();
  res.json(products);
};

// get one product by its id
export const getProductById = async (req: Request, res: Response) => {
  const product = await Product.findByPk(req.params.id);
  if (product) {
    res.json(product);
  } else {
    // return 404 if product doesn't exist
    res.status(404).json({ error: "Product not found" });
  }
};

// create a new product with uploaded image
export const createProduct = async (req: Request, res: Response) => {
  // make sure an image was uploaded
  if (!req.file) {
    return res.status(400).json({ error: "Image file is required" });
  }
  // create product with form data and image filename
  const newProduct = await Product.create({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: req.file.filename,
  });
  // return 201 created status with new product
  res.status(201).json(newProduct);
};

// update an existing product
export const updateProduct = async (req: Request, res: Response) => {
  const product = await Product.findByPk(req.params.id);
  if (product) {
    // prepare update data with form fields
    const updateData: any = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
    };

    // only update image if user uploaded a new one
    if (req.file) {
      updateData.image = req.file.filename;
    }

    await product.update(updateData);
    res.json(product);
  } else {
    res.status(404).json({ error: "Product not found" });
  }
};

// delete a product from database
export const deleteProduct = async (req: Request, res: Response) => {
  const product = await Product.findByPk(req.params.id);
  if (product) {
    await product.destroy();
    // return 204 no content on successful delete
    res.status(204).end();
  } else {
    res.status(404).json({ error: "Product not found" });
  }
};
