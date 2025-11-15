import type { Application } from "express"; 
import * as helmet from "helmet";
import express from "express";
import * as cors from "cors";
import * as compression from "compression";
import * as morgan from "morgan";
import routes from "./routes/index.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { RateLimiterMiddleware } from "./middlewares/rateLimiter.js";
import { config } from "./config/index.js";

const app: Application = express();

// Security & Middleware
app.use(helmet.default());
app.use(cors.default({
    origin: config.corsOrigin, 
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  }));
app.use(express.json());
app.use(compression.default());
app.use(morgan.default("dev"));


// 🚀 Apply rate limiting before routes
app.use(RateLimiterMiddleware.apply);

// API Routes with versioning
app.use("/api", routes);

// Global error handler
app.use(errorHandler);

export default app;