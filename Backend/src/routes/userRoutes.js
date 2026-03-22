import express from "express";
import * as userController from "../controllers/userController.js";
import { authenticate, authorizeRoles } from "../middleware/auth.js";
import { upload } from "../config/cloudinary.js";

const router = express.Router();

// Public auth routes
router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/google", userController.googleLogin);

// Protected currently logged-in user routes
router.get("/me", authenticate, userController.getMe);
router.put("/me", authenticate, userController.updateMe);
router.post("/me/avatar", authenticate, upload.single("avatar"), userController.uploadAvatar);
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
