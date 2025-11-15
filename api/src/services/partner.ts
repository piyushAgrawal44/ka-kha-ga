import { db } from "../config/database.js";
import type { Prisma } from "@prisma/client";
import { logger } from "../utils/logger.js";

export class PartnerService {
    /**
     * Partner Create Function
     */
    async createPartner(data: Prisma.PartnerCreateInput) {
        try {
            const partner = await db.partner.create({ data });
            return {
                partnerId: partner.id
            };
        } catch (error) {
            logger.error({ message: "Error creating partner", object: error })
            throw new Error("Failed to create partner");
        }
    }
}