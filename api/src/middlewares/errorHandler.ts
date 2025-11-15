import type { Request, Response, NextFunction } from "express";
import { logger } from "../utils/logger.js";
import { sendErrorResponse } from "../utils/response.js";

export const errorHandler = (err: any, req: Request, res: Response, _next: NextFunction) => {
  logger.error({message:"Internal Server Error", object: err})
  return sendErrorResponse(res, {message: "Radhe Radhe, Something unexpected occurred. Please try after sometime.", code: 501, error: "Internal Server Error"})
};
