// src/controllers/campaignController.js
import * as campaignService from "../services/campaignService.js";

export const getCampaigns = async (req, res, next) => {
    try {
        const campaigns = await campaignService.getAllCampaigns();
        res.status(200).json({ success: true, data: campaigns });
    } catch (err) {
        next(err);
    }
};

export const getCampaignById = async (req, res, next) => {
    try {
        const campaign = await campaignService.getCampaignById(req.params.id);
        res.status(200).json({ success: true, data: campaign });
    } catch (err) {
        next(err);
    }
};

export const createCampaign = async (req, res, next) => {
    try {
        const campaign = await campaignService.createCampaign(req.body);
        res.status(201).json({ success: true, data: campaign });
    } catch (err) {
        next(err);
    }
};

export const updateCampaign = async (req, res, next) => {
    try {
        const campaign = await campaignService.updateCampaign(req.params.id, req.body);
        res.status(200).json({ success: true, data: campaign });
    } catch (err) {
        next(err);
    }
};

export const deleteCampaign = async (req, res, next) => {
    try {
        await campaignService.deleteCampaign(req.params.id);
        res.status(200).json({ success: true, message: "Campaign deleted" });
    } catch (err) {
        next(err);
    }
};
