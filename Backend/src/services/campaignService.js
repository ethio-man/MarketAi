// src/services/campaignService.js
import { prisma } from "../db/prisma.js";
import { createError } from "../middleware/errorHandler.js";

export const getAllCampaigns = async () => {
    return prisma.campaign.findMany({ orderBy: { createdAt: "desc" } });
};

export const getCampaignById = async (id) => {
    const campaign = await prisma.campaign.findUnique({ where: { id } });
    if (!campaign) throw createError("Campaign not found", 404);
    return campaign;
};

export const createCampaign = async (data) => {
    return prisma.campaign.create({ data });
};

export const updateCampaign = async (id, data) => {
    await getCampaignById(id);
    return prisma.campaign.update({ where: { id }, data });
};

export const deleteCampaign = async (id) => {
    await getCampaignById(id);
    return prisma.campaign.delete({ where: { id } });
};
