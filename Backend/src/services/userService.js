// src/services/userService.js
import { prisma } from "../db/prisma.js";
import { createError } from "../middleware/errorHandler.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";

const generateTokenAndPayload = (user) => {
    const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );
    return { 
        token, 
        user: { 
            id: user.id, 
            name: user.name, 
            email: user.email, 
            role: user.role,
            avatarUrl: user.avatarUrl,
            businessType: user.businessType
        } 
    };
};

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
    
    // Normal registration requires password
    if (!password) throw createError("Password is required", 400);
    
    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
        data: { name, email, password: hashed, role: role || "user" },
    });
    return generateTokenAndPayload(user);
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
    if (!user.password) throw createError("This account uses Google Sign-In. Please log in with Google.", 401);
    
    const match = await bcrypt.compare(password, user.password);
    if (!match) throw createError("Invalid email or password", 401);
    
    return generateTokenAndPayload(user);
};

export const googleLogin = async (credential) => {
    try {
        const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
        const ticket = await googleClient.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        const { sub: googleId, email, name, picture: avatarUrl } = payload;

        let user = await prisma.user.findUnique({ where: { email } });

        if (user) {
            // Update existing user with googleId if they don't have it, or update picture
            user = await prisma.user.update({
                where: { email },
                data: {
                    googleId: user.googleId || googleId,
                    avatarUrl: user.avatarUrl || avatarUrl, // only override if they don't have one
                }
            });
        } else {
            // Create new Google user
            user = await prisma.user.create({
                data: {
                    name,
                    email,
                    googleId,
                    avatarUrl,
                    password: null, // No password for Google users
                }
            });
        }
        
        return generateTokenAndPayload(user);
    } catch (error) {
        throw createError("Google authentication failed", 401);
    }
};
