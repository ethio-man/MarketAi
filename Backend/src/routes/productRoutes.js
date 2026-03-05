// src/routes/productRoutes.js
import express from "express";
import * as productController from "../controllers/productController.js";
import { authenticate, authorizeRoles } from "../middleware/auth.js";

const router = express.Router();

router.get("/", productController.getProducts);
router.get("/:id", productController.getProductById);
router.post("/", authenticate, authorizeRoles("admin", "super_admin"), productController.createProduct);
router.put("/:id", authenticate, authorizeRoles("admin", "super_admin"), productController.updateProduct);
router.delete("/:id", authenticate, authorizeRoles("admin", "super_admin"), productController.deleteProduct);

export default router;
