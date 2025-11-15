import { SignJWT, jwtVerify, JWTPayload } from "jose";
import { config } from "../config/index.js";

export class JwtUtil {
  private static secret = new TextEncoder().encode(config.jwtSecret);

  /**
   * Generate a JWT token
   * @param payload Data to encode in token
   * @param expiresIn Expiry time (default: 1h)
   */
  static async generateToken(payload: JWTPayload, expiresIn: string = config.jwtTokenExpiry): Promise<string> {
    return await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime(expiresIn)
      .sign(this.secret);
  }

  /**
   * Verify and decode a JWT token
   * @param token Bearer token string
   * @returns Decoded payload
   * @throws Error if invalid or expired
   */
  static async verifyToken(token: string): Promise<JWTPayload> {
    const { payload } = await jwtVerify(token, this.secret);
    return payload;
  }

  /**
   * Decode token without verifying (safe + typed)
   */
  static decodeToken(token: string): JWTPayload | null {
    try {
      const parts = token.split(".");
      if (parts.length < 2 || !parts[1]) return null;

      const payloadBase64: string = parts[1]; // ✅ ensure string
      const decoded = Buffer.from(payloadBase64, "base64").toString("utf8");
      return JSON.parse(decoded);
    } catch {
      return null;
    }
  }
}
