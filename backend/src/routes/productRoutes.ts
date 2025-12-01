import Router from "express";
import upload from "../filestorage";
import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } from "../controllers/productController";

// set up api routes for product operations
const router = Router();

// get all products
router.get("/products", getAllProducts);

// get one specific product by id
router.get("/products/:id", getProductById);

// create new product (with image upload)
router.post("/products", upload.single("image"), createProduct);

// update existing product (with optional new image)
router.put("/products/:id", upload.single("image"), updateProduct);

// delete a product
router.delete("/products/:id", deleteProduct);

export default router;
