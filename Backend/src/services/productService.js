// src/services/productService.js
import { prisma } from "../db/prisma.js";
import { createError } from "../middleware/errorHandler.js";

export const getAllProducts = async () => {
    return prisma.product.findMany({ orderBy: { createdAt: "desc" } });
};

export const getProductById = async (id) => {
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) throw createError("Product not found", 404);
    return product;
};

export const createProduct = async (data) => {
    return prisma.product.create({ data });
};

export const updateProduct = async (id, data) => {
    await getProductById(id);
    return prisma.product.update({ where: { id }, data });
};

export const deleteProduct = async (id) => {
    await getProductById(id);
    return prisma.product.delete({ where: { id } });
};
