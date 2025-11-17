import { Request, Response, NextFunction } from "express";
import { JwtUtil } from "../utils/jwt.js";
import { sendErrorResponse } from "../utils/response.js";
import { UserService } from "../services/user.js";
import { UserAuthTokenPayloadType } from "../types/user.js";

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

      const decoded: UserAuthTokenPayloadType = await JwtUtil.verifyToken(token);
      const userId: number = decoded.userId;

      const US = new UserService();
      const user = await US.getUserById(userId);

      if (!user) return sendErrorResponse(res, {
        code: 401,
        message: "Invalid authentication token",
        error: "User not found in our DB"
      });

      req.user = {
        id: user.id,
        userId: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        partnerId: user.partnerId,
        parentId: user.parentId,
      };

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
