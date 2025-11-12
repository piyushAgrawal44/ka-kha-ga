import rateLimit from "express-rate-limit";
import slowDown from "express-slow-down";
import { Request, Response, NextFunction } from "express";

/**
 * This middleware provides layered protection:
 * - Basic rate limiting (requests per IP)
 * - Progressive slowdown after repeated hits
 */

export class RateLimiterMiddleware {
  // 🧱 Step 1: Basic rate limit (100 requests per 15 minutes per IP)
  static basicLimiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 min window
    max: 200, // limit each IP to 10 requests
    standardHeaders: true,
    legacyHeaders: false,
    message: { code: 429, message: "Too many requests, please try again later." },
  });

  // 🕒 Step 2: Progressive slowdown for repeated hits
  static speedLimiter = slowDown({
    windowMs: 10 * 60 * 1000, // 10 min
    delayAfter: 100, // allow 50 requests without delay
    delayMs: () => 1000, // after that, 500ms delay per request
  });

  // Combine both - use arrow function to preserve 'this' context
  static apply = (req: Request, res: Response, next: NextFunction) => {
    RateLimiterMiddleware.speedLimiter(req, res, (err: any) => {
      if (err) return next(err);
      RateLimiterMiddleware.basicLimiter(req, res, next);
    });
  };
}