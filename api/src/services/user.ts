import { db } from "../config/database.js";
import type { Prisma } from "@prisma/client";
import { logger } from "../utils/logger.js";

export class UserService {
  /**
   * 🔹 Create new user
   */
  async createUser(data: Prisma.UserCreateInput) {
    try {
      const user = await db.user.create({ data });
      return {
        userId: user.id
      };
    } catch (error) {
      logger.error({ message: "Error creating user", object: error })
      throw new Error("Failed to create user");
    }
  }

  /**
   * Update user details
   */
  async updateUser(userId: number, data: Prisma.UserUpdateInput) {
    return db.user.update({
      where: { id: userId },
      data,
    });
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
      logger.error({ message: "Error fetching users", object: error })
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
      logger.error({ message: "Error fetching user by email", object: error })
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
      logger.error({ message: "Error fetching user by ID", object: error })
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
      logger.error({ message: "Error deleting user", object: error })
      throw new Error("Failed to delete user");
    }
  }
}
