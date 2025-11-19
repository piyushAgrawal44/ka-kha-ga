import { db } from "../../config/database.js";
import type { Prisma } from "@prisma/client";
import { logger } from "../../utils/logger.js";
import moment from "moment";

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
    async getParentByEmail(email: string) {
        try {
            const parent = await db.user.findUnique({ where: { email: email, role: "PARENT" } });
            if (!parent) return null;
            return parent;
        } catch (error) {
            logger.error({ message: "Failed to get parent using email id", object: error })
            throw new Error("Failed to get parent using email id");
        }
    }

    /**
     * Create Partner → Parent Invitation
     */
    async createPartnerParentInvitation(data: Prisma.PartnerParentInvitationCreateInput) {
        try {
            const invitation = await db.partnerParentInvitation.create({
                data
            });

            return {
                invitationId: invitation.id,
                expiryAt: invitation.expiryAt
            };
        } catch (error) {
            logger.error({ message: "Error creating PartnerParentInvitation", object: error });
            throw new Error("Failed to create PartnerParentInvitation");
        }
    }


    /**
     * Find invitation by decrypted invitationId
     */
    async findInvitationById(invitationId: number) {
        return db.partnerParentInvitation.findUnique({
            where: { id: invitationId },
            include: {
                partner: true,
                parent: true
            }
        });
    }

    /**
     * Mark invitation as accepted
     */
    async acceptInvitation(invitationId: number) {
        return db.partnerParentInvitation.update({
            where: { id: invitationId },
            data: {
                status: "ACCEPTED",
                parentActionAt: moment().toDate()
            }
        });
    }

    /**
     * Mark invitation as rejected
     */
    async rejectInvitation(invitationId: number) {
        return db.partnerParentInvitation.update({
            where: { id: invitationId },
            data: {
                status: "REJECTED",
                parentActionAt: moment().toDate()
            }
        });
    }

}