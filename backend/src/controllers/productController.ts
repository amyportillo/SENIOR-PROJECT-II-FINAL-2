import { Request, Response } from "express";
import { Product } from "../models/Product";

// get all products from database and return as json
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// get one product by its id
export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (product) {
      res.json(product);
    } else {
      // return 404 if product doesn't exist
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// create a new product with uploaded image
export const createProduct = async (req: Request, res: Response) => {
  try {
    console.log("=== CREATE PRODUCT REQUEST ===");
    console.log("Body:", req.body);
    console.log("File:", req.file);
    
    // make sure an image was uploaded
    if (!req.file) {
      console.log("ERROR: No file uploaded");
      return res.status(400).json({ error: "Image file is required" });
    }
    
    console.log("Creating product with image:", req.file.filename);
    // create product with form data and image filename
    const newProduct = await Product.create({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: req.file.filename,
    });
    console.log("Product created successfully:", newProduct.toJSON());
    // return 201 created status with new product
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// update an existing product
export const updateProduct = async (req: Request, res: Response) => {
  try {
    console.log("=== UPDATE PRODUCT REQUEST ===");
    console.log("Product ID:", req.params.id);
    console.log("Body:", req.body);
    console.log("File:", req.file);
    
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
        console.log("Updating with new image:", req.file.filename);
        updateData.image = req.file.filename;
      } else {
        console.log("No new image, keeping existing");
      }

      await product.update(updateData);
      console.log("Product updated successfully:", product.toJSON());
      res.json(product);
    } else {
      console.log("Product not found");
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// delete a product from database
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (product) {
      await product.destroy();
      // return 204 no content on successful delete
      res.status(204).end();
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
