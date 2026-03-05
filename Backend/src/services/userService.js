// src/services/userService.js
import { prisma } from "../db/prisma.js";
import { createError } from "../middleware/errorHandler.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const getAllUsers = async () => {
    return prisma.user.findMany({
        select: { id: true, name: true, email: true, role: true, createdAt: true },
    });
};

export const getUserById = async (id) => {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) throw createError("User not found", 404);
    return user;
};

export const createUser = async ({ name, email, password, role }) => {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) throw createError("Email already in use", 409);
    const hashed = await bcrypt.hash(password, 10);
    return prisma.user.create({
        data: { name, email, password: hashed, role: role || "user" },
    });
};

export const updateUser = async (id, data) => {
    await getUserById(id);
    if (data.password) data.password = await bcrypt.hash(data.password, 10);
    return prisma.user.update({ where: { id }, data });
};

export const deleteUser = async (id) => {
    await getUserById(id);
    return prisma.user.delete({ where: { id } });
};

export const loginUser = async (email, password) => {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw createError("Invalid email or password", 401);
    const match = await bcrypt.compare(password, user.password);
    if (!match) throw createError("Invalid email or password", 401);
    const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );
    return { token, user: { id: user.id, name: user.name, email: user.email, role: user.role } };
};
