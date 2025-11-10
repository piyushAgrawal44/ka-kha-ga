import { Response } from "express";

/**
 * Standard success response structure
 */
interface SuccessResponse<T = any> {
  code?: number; // default: 200
  message: string;
  data?: T | null;
}

/**
 * Standard error response structure
 */
interface ErrorResponse {
  code?: number; // default: 500
  message: string;
  error?: any;
}

/**
 * ✅ Send success response
 */
export const sendSuccessResponse = <T>(
  res: Response,
  { code = 200, message, data = null }: SuccessResponse<T>
): Response => {
  const responseBody = {
    success: true,
    code,
    message,
    data,
    error: null,
  };

  return res.status(code).json(responseBody);
};

/**
 * ❌ Send error response
 */
export const sendErrorResponse = (
  res: Response,
  { code = 500, message, error = null }: ErrorResponse
): Response => {
  const responseBody = {
    success: false,
    code,
    message,
    data: null,
    error,
  };

  return res.status(code).json(responseBody);
};
