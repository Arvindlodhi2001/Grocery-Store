import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { logger } from "./utils/logger.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// app.options("*", cors());
app.options(/.*/, cors());

// Body parsers
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Cookie Parser
app.use(cookieParser());

// Static files
app.use("/uploads", express.static("uploads"));

// Request logging middleware
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path}`);
  next();
});

// Routes Import
import userRoutes from "./userRoutes/user.routes.js";
import adminRouter from "./Admin/adminRouter/admin.router.js";

// Route Mounting
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/admin", adminRouter);

app.get("/", (req, res) => {
  res.send("🚀 Grocery Backend is Running");
});

// 404 Handler
app.use((req, res) => {
  logger.warn(`Route not found: ${req.method} ${req.path}`);
  res.status(404).json({
    statusCode: 404,
    data: null,
    message: "Route not found",
    success: false,
  });
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  logger.error({
    statusCode,
    message,
    path: req.path,
    method: req.method,
    stack: err.stack,
  });

  res.status(statusCode).json({
    statusCode,
    data: null,
    message,
    success: false,
  });
});

export { app };
