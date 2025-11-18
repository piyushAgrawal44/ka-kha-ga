import { db } from "../../config/database.js";
import type { Prisma } from "@prisma/client";
import { logger } from "../../utils/logger.js";

export class ParentService {
    /**
     * Partner Create Function
     */
    async createParent(data: Prisma.ParentCreateInput) {
        try {
            const parent = await db.parent.create({ data });
            return {
                parentId: parent.id
            };
        } catch (error) {
            logger.error({ message: "Error creating parent", object: error })
            throw new Error("Failed to create parent");
        }
    }
    async getParentByEmail(email: string){
        try {
            const parent = await db.user.findUnique({where: {email: email, role: "PARENT"}});
            if(!parent) return null;
            return parent;
        } catch (error) {
            logger.error({ message: "Failed to get parent using email id", object: error })
            throw new Error("Failed to get parent using email id");
        }
    }
}