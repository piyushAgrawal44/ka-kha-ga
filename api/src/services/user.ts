import { db } from "../config/database";
import type { Prisma } from "@prisma/client";

export class UserService {
  /**
   * 🔹 Create new user
   */
  async createUser(data: Prisma.UserCreateInput) {
    try {
      const user = await db.user.create({ data });
      return {
        user_id: user.id
      };
    } catch (error) {
      console.error("Error creating user:", error);
      throw new Error("Failed to create user");
    }
  }

  /**
   * 🔹 Get all users
   */
  async getAllUsers() {
    try {
      const users = await db.user.findMany({
        include: {
          partnerProfile: true,
          parentProfile: true,
        },
        orderBy: { id: "desc" },
      });
      return users;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw new Error("Failed to fetch users");
    }
  }

  /**
   * 🔹 Get single user by email
   */
  async checkEmailExist(email: string) {
    try {
      const user = await db.user.findUnique({
        where: { email },
        include: {
          partnerProfile: false,
          parentProfile: false,
        },
      });
      return user;
    } catch (error) {
      console.error("Error fetching user by email:", error);
      throw new Error("Failed to fetch user by email");
    }
  }

  /**
   * 🔹 Get user by ID
   */
  async getUserById(id: number) {
    try {
      const user = await db.user.findUnique({
        where: { id },
        include: {
          partnerProfile: true,
          parentProfile: true,
        },
      });
      return user;
    } catch (error) {
      console.error("Error fetching user by ID:", error);
      throw new Error("Failed to fetch user by ID");
    }
  }

  /**
   * 🔹 Soft delete user
   */
  async softDeleteUser(id: number) {
    try {
      const user = await db.user.update({
        where: { id },
        data: { deletedAt: new Date() },
      });
      return user;
    } catch (error) {
      console.error("Error deleting user:", error);
      throw new Error("Failed to delete user");
    }
  }
}
