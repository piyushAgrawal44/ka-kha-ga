import bcrypt from "bcryptjs";

export class PasswordUtil {
  private static saltRounds = 10; // can increase if needed

  /**
   * 🔹 Hash a plain password
   */
  static async hash(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.saltRounds);
    return await bcrypt.hash(password, salt);
  }

  /**
   * 🔹 Compare plain text password with hashed password
   */
  static async compare(plain: string, hashed: string): Promise<boolean> {
    return await bcrypt.compare(plain, hashed);
  }
}
