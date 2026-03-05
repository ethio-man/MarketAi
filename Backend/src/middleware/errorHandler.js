// src/middleware/errorHandler.js
// Centralized global error handler middleware
export const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    console.error(`[ERROR] ${req.method} ${req.path} → ${message}`);
    if (process.env.NODE_ENV !== "production") {
        console.error(err.stack);
    }

    res.status(statusCode).json({
        success: false,
        error: message,
        ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
    });
};

// Helper to create structured errors
export const createError = (message, statusCode = 500) => {
    const err = new Error(message);
    err.statusCode = statusCode;
    return err;
};
