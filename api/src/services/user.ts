import { db } from "../config/database";

export class UserService {
  async createUser(name: string, email: string, password: string) {
    return await db.user.create({
      data: { name, email, password },
    });
  }

  async getAllUsers() {
    return await db.user.findMany();
  }

  async getUserByEmail(email: string) {
    return await db.user.findUnique({ where: { email } });
  }
}
