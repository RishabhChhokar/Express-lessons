import { Router } from "express";
import {
  getProducts,
  addProduct,
  deleteProduct,
} from "../controllers/productController.js";

const router = Router();

router.get("/products", getProducts);
router.post("/products", addProduct);
router.delete("/products/:id", deleteProduct);

export default router;
