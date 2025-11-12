import express from "express";
import type { Application } from "express"; 
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import routes from "./routes";
import { errorHandler } from "./middlewares/errorHandler";
import { RateLimiterMiddleware } from "./middlewares/rateLimiter";

const app: Application = express();

// Security & Middleware
app.use(helmet());
app.use(cors());
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