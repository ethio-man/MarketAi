// src/routes/aiRoutes.js
import express from "express";
import * as aiController from "../controllers/aiController.js";
import { authenticate, authorizeRoles } from "../middleware/auth.js";

const router = express.Router();

// Public: anyone can chat with the AI assistant
router.post("/chat", aiController.askAssistant);

// Admin-only: manage knowledge base documents
router.post(
    "/knowledge",
    authenticate,
    authorizeRoles("admin", "super_admin"),
    aiController.ingestKnowledge
);
router.get(
    "/knowledge",
    authenticate,
    authorizeRoles("admin", "super_admin"),
    aiController.listKnowledge
);
router.delete(
    "/knowledge/:id",
    authenticate,
    authorizeRoles("admin", "super_admin"),
    aiController.deleteKnowledge
);

export default router;
