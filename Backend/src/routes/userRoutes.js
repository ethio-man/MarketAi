import express from "express";
import * as userController from "../controllers/userController.js";
import { authenticate, authorizeRoles } from "../middleware/auth.js";

const router = express.Router();

// Public routes
router.post("/register", userController.register);
router.post("/login", userController.login);

// Protected routes
router.get(
  "/",
  authenticate,
  authorizeRoles("admin", "super_admin"),
  userController.getUsers,
);
router.get("/:id", authenticate, userController.getUserById);
router.put("/:id", authenticate, userController.updateUser);
router.delete(
  "/:id",
  authenticate,
  authorizeRoles("admin", "super_admin"),
  userController.deleteUser,
);

export default router;
