import type { Request, Response, NextFunction } from "express";
import type { ZodSchema } from "zod";
import { sendErrorResponse } from "../utils/response";

export class Validate {
  static body(schema: ZodSchema) {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        schema.parse(req.body);
        next();
      } catch (err: any) {
        return sendErrorResponse(res, {code: 400, message: "Validation Failed", error: err})
      }
    };
  }
}
