import { Request, Response, NextFunction } from "express";
import { sendErrorResponse } from "../utils/response.js";

export const RoleCheck = {
  allow: (...allowedRoles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        const user = req.user;

        if (!user) {
          return sendErrorResponse(res, {
            code: 401,
            message: "User not authenticated",
            error: "Unauthorized"
          });
        }

        if (!allowedRoles.includes(user.role)) {
          return sendErrorResponse(res, {
            code: 403,
            message: "Access denied ! You do not have access to this resource",
            error: "Forbidden: Insufficient permissions"
          });
        }

        return next();
      } catch (error) {
        return sendErrorResponse(res, {
          code: 500,
          message: "Role validation error",
          error: error
        });
      }
    };
  }
};
