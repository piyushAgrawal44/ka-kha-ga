import { NextFunction, Request, Response } from "express";
import { UserAuthTokenPayloadType } from "../types/user.js";
import { JwtUtil } from "../utils/jwt.js";
import { sendErrorResponse } from "../utils/response.js";
import { logger } from "../utils/logger.js";

export interface AuthenticatedRequest extends Request {
    user?: UserAuthTokenPayloadType;
}

export class AuthMiddleware {
    /**
     * Express middleware to verify JWT and attach user payload
     */
    static async verifyToken(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
            const authHeader = req.headers.authorization;

            if (!authHeader || !authHeader.startsWith("Bearer ")) {
                return sendErrorResponse(res, { code: 400, message: "Authorization token missing or invalid" })
            }

            const token: string = authHeader.split(" ")?.[1] || "";
            const payload = await JwtUtil.verifyToken(token);

            // Attach decoded payload to request
            req.user = {
                user_id: payload.user_id as number,
                name: payload.name as string,
                role: payload.role as any,
                partnerId: payload.partnerId as number | null,
                parentId: payload.parentId as number | null,
            };

            next();
        } catch (error) {
            logger.error({message: "Invalid or expired auth token", object: error})
            return sendErrorResponse(res, {code: 400, message: "Invalid or expired auth token",})
        }
    }
}
