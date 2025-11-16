import { Request, Response, NextFunction } from "express";
import { JwtUtil } from "../utils/jwt.js";
import { sendErrorResponse } from "../utils/response.js";

export const AuthMiddleware = {
  verifyToken: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;
      const token = authHeader?.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : null;

      if (!token) {
        return sendErrorResponse(res, {
          code: 401,
          message: "Missing authentication token",
          error: "No token"
        });
      }

      const decoded = await JwtUtil.verifyToken(token);

      req.user = decoded;

      next();
    } catch (error) {
      return sendErrorResponse(res, {
        code: 401,
        message: "Invalid or expired token",
        error: "Invalid Token"
      });
    }
  }
};
