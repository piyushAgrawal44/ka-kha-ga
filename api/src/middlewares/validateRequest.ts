import type { Request, Response, NextFunction } from "express";
import type { ZodSchema } from "zod";
import { sendErrorResponse } from "../utils/response.js";

export class Validate {
  static schema(schema: ZodSchema) {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        schema.parse({
          body: req.body,
          query: req.query,
          params: req.params,
        });

        return next();
      } catch (error: any) {
        return sendErrorResponse(res, { code: 400, message: "Validation Failed", error: error })
      }
    };
  }
  static body(schema: ZodSchema) {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        schema.parse(req.body);
        next();
      } catch (error: any) {
        return sendErrorResponse(res, { code: 400, message: "Validation Failed", error: error })
      }
    };
  }
}
