import { z } from "zod";

export class AuthValidation {
  /**
   * 🔹 Register validation
   */
  static registerSchema = z.object({
    name: z
      .string()
      .nonempty("Name is required")
      .min(2, { message: "Name must be at least 2 characters" }),

    email: z
      .string()
      .nonempty("Email is required")
      .email({ message: "Invalid email format" }),

    password: z
      .string()
      .nonempty("Password is required")
      .min(6, { message: "Password must be at least 6 characters" }),

    role: z.enum(["PARTNER", "PARENT"], {
      message: "Role must be PARTNER or PARENT",
    }),
  });

  /**
   * 🔹 Login validation
   */
  static loginSchema = z.object({
    email: z
      .string()
      .nonempty("Email is required")
      .email({ message: "Invalid email format" }),

    password: z
      .string()
      .nonempty("Password is required"),
  });
}
