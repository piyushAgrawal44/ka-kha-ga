import { db } from "../config/database";
import type { Prisma } from "@prisma/client";
import { logger } from "../utils/logger";

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
}