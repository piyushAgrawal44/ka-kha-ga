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




    /**
     * Get paginated and filtered invitations list
     */
    async getInvitationsList(params: GetInvitationsListParams) {
        try {
            const { filters, skip, take, sortBy, sortOrder } = params;

            const invitations = await db.partnerParentInvitation.findMany({
                where: filters,
                skip,
                take,
                orderBy: {
                    [sortBy]: sortOrder
                },
                include: {
                    parent: {
                        include: {
                            user: {
                                select: {
                                    name: true,
                                    email: true
                                }
                            }
                        }
                    }
                }
            });

            // Transform data for response
            return invitations.map(invitation => ({
                invitationId: invitation.id,
                status: invitation.status,
                parentName: invitation.parent.user.name,
                parentEmail: invitation.parent.user.email,
                sentAt: invitation.createdAt,
                expiryAt: invitation.expiryAt,
                parentActionAt: invitation.parentActionAt,
                isExpired: new Date(invitation.expiryAt) < new Date() && invitation.status === 'PENDING',
                daysUntilExpiry: invitation.status === 'PENDING'
                    ? Math.ceil((new Date(invitation.expiryAt).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
                    : null
            }));
        } catch (error) {
            logger.error({
                message: "Error getting invitations list",
                object: error
            });
            throw new Error("Failed to get invitations list");
        }
    }

    /**
     * Get total count of invitations matching filters
     */
    async getInvitationsCount(filters: any) {
        try {
            return await db.partnerParentInvitation.count({
                where: filters
            });
        } catch (error) {
            logger.error({
                message: "Error counting invitations",
                object: error
            });
            throw new Error("Failed to count invitations");
        }
    }

    /**
     * Get invitation statistics for partner
     */
    async getInvitationsStatistics(partnerId: number) {
        try {
            const now = new Date();

            const [
                totalInvites,
                pendingInvites,
                acceptedInvites,
                rejectedInvites,
                expiredInvites
            ] = await Promise.all([
                // Total invitations
                db.partnerParentInvitation.count({
                    where: {
                        partnerId,
                        deletedAt: null
                    }
                }),

                // Pending invitations
                db.partnerParentInvitation.count({
                    where: {
                        partnerId,
                        status: 'PENDING',
                        expiryAt: { gte: now },
                        deletedAt: null
                    }
                }),

                // Accepted invitations
                db.partnerParentInvitation.count({
                    where: {
                        partnerId,
                        status: 'ACCEPTED',
                        deletedAt: null
                    }
                }),

                // Rejected invitations
                db.partnerParentInvitation.count({
                    where: {
                        partnerId,
                        status: 'REJECTED',
                        deletedAt: null
                    }
                }),

                // Expired invitations (pending but past expiry)
                db.partnerParentInvitation.count({
                    where: {
                        partnerId,
                        status: 'PENDING',
                        expiryAt: { lt: now },
                        deletedAt: null
                    }
                })
            ]);

            // Calculate acceptance rate
            const totalProcessed = acceptedInvites + rejectedInvites;
            const acceptanceRate = totalProcessed > 0
                ? Math.round((acceptedInvites / totalProcessed) * 100)
                : 0;

            return {
                total: totalInvites,
                pending: pendingInvites,
                accepted: acceptedInvites,
                rejected: rejectedInvites,
                expired: expiredInvites,
                acceptanceRate
            };
        } catch (error) {
            logger.error({
                message: "Error getting invitation statistics",
                object: error
            });
            throw new Error("Failed to get invitation statistics");
        }
    }

}