import express from "express";
import { updateProduct, deleteProduct, createProduct, getAllProducts } from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.get("/product/", getAllProducts);
productRouter.post("/product/post", isAuthenticated, isMod, createProduct);
productRouter.put("/product/:id", isAuthenticated, isMod, updateProduct);
productRouter.delete("/product/:id", isAuthenticated, isAdmin, deleteProduct);


export default productRouter;