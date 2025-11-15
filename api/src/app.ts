import express from "express";
import type { Application } from "express"; 
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import routes from "./routes/index.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { RateLimiterMiddleware } from "./middlewares/rateLimiter.js";
import { config } from "./config/index.js";

const app: Application = express();

// Security & Middleware
app.use(helmet());
app.use(cors({
    origin: config.corsOrigin, 
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  }));
app.use(express.json());
app.use(compression());
app.use(morgan("dev"));


// 🚀 Apply rate limiting before routes
app.use(RateLimiterMiddleware.apply);

// API Routes with versioning
app.use("/api", routes);

// Global error handler
app.use(errorHandler);

export default app;