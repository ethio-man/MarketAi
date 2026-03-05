// src/middleware/auth.js
// JWT Authentication middleware
import jwt from "jsonwebtoken";
import { createError } from "./errorHandler.js";

export const authenticate = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return next(createError("Unauthorized: No token provided", 401));
        }
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        next(createError("Unauthorized: Invalid token", 401));
    }
};

export const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user?.role)) {
            return next(createError("Forbidden: Insufficient permissions", 403));
        }
        next();
    };
};
