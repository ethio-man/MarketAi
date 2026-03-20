import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { prisma } from "./db/prisma.js";
import { errorHandler } from "./middleware/errorHandler.js";

// Routes
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import campaignRoutes from "./routes/campaignRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({ origin: process.env.CLIENT_URL || "*", credentials: true }));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/campaigns", campaignRoutes);
app.use("/api/ai", aiRoutes);

app.use((req, res) => {
  res.status(404).json({ success: false, error: "Route not found" });
});

app.use(errorHandler);

const server = app.listen(PORT, async () => {
  console.log(`\n Server running on port ${PORT} ...`);
  try {
    await prisma.$connect();
    console.log(" Database connected successfully");
  } catch (err) {
    console.error(" Database connection failed:", err.message);
  }
});

// Graceful shutdown
process.on("SIGTERM", async () => {
  console.log("SIGTERM received. Closing server...");
  server.close(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
});

export default server;
