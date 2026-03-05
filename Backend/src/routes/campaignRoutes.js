// src/routes/campaignRoutes.js
import express from "express";
import * as campaignController from "../controllers/campaignController.js";
import { authenticate, authorizeRoles } from "../middleware/auth.js";

const router = express.Router();

router.get("/", authenticate, campaignController.getCampaigns);
router.get("/:id", authenticate, campaignController.getCampaignById);
router.post("/", authenticate, campaignController.createCampaign);
router.put("/:id", authenticate, campaignController.updateCampaign);
router.delete("/:id", authenticate, authorizeRoles("admin", "super_admin"), campaignController.deleteCampaign);

export default router;
