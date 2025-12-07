import { Request, Response } from "express";
import { ParentService } from "../../services/parent/parent.js";
import { sendErrorResponse, sendSuccessResponse } from "../../utils/response.js";
import { logger } from "../../utils/logger.js";
import EmailService from "../../services/email/emailService.js";
import { db } from "../../config/database.js";
import { config } from "../../config/index.js";
import { EncryptionUtilInstance } from "../../utils/encryption.js";

export class ParentController {
    protected ParentService = new ParentService();
    protected EmailService = new EmailService(db);

    /**
     * Function to send invite to parent
     */
    async sendInvite(req: Request, res: Response) {

        try {
            const parentInputEmail = req.body.email;
            const partner = req.user;

            const parentUser = await this.ParentService.getParentByEmail(parentInputEmail);
            if (!parentUser) return sendErrorResponse(res, { code: 404, message: "Parent not found for given email address", error: "Parent Not Found" });
            if (!parentUser.parentId) return sendErrorResponse(res, { code: 404, message: "Parent not found for given email address", error: "Parent Not Found" });


            logger.debug({message: `Parent found: ID ${parentUser.id}`, object: parentUser})


            // 3. Insert invitation
            const expiryAt = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000); // 2 days

            const invitation = await this.ParentService.createPartnerParentInvitation({
                partner: { connect: { id: partner.partnerId } },
                parent: { connect: { id: parentUser.parentId } },
                expiryAt
            });


            const encryptedId = EncryptionUtilInstance.encrypt(invitation.invitationId.toString());

            // 4. Send email
            await this.EmailService.sendEmail({
                recipientName: parentUser.name,
                to: parentUser.email,
                templateType: "PARENT_INVITE",
                variables: {
                    NAME: parentUser.name,
                    PARTNER_NAME: partner.name,
                    INVITE_LINK: `${config.frontendAppDomain}/parent-invite/${encryptedId}`
                }
            });

            return sendSuccessResponse(res, {
                code: 201,
                message: "Invite sent successfully",
                data: {
                    expiryAt
                }
            });
        } catch (error) {
            logger.error({ message: "Error sending invite to parent", object: error });
            return sendErrorResponse(res, { code: 501, message: "Failed to send invitation to parent. Please try again later", error: "Internal Server Error" })
        }

    }

    /**
     * Validate Invite (check if valid, not expired, not accepted/rejected)
     */
    async validateInvite(req: Request, res: Response) {
        try {
            const encryptedId = req.params.encryptedId || "";

            logger.debug({message:`Encryption ID: ${encryptedId}`, object: req.params})
            const decodedId = EncryptionUtilInstance.decrypt(encryptedId);
            const invitationId = Number(decodedId);

            const invitation = await this.ParentService.findInvitationById(invitationId);
            if (!invitation)
                return sendErrorResponse(res, {
                    code: 404,
                    message: "Invitation not found",
                    error: "Invalid Invite"
                });

            if (invitation.deletedAt)
                return sendErrorResponse(res, {
                    code: 410,
                    message: "Invitation removed",
                    error: "Invite Removed"
                });

            if (invitation.status !== "PENDING")
                return sendErrorResponse(res, {
                    code: 400,
                    message: `Invitation already ${invitation.status.toLowerCase()}`,
                    error: "Already Processed"
                });

            if (new Date(invitation.expiryAt) < new Date())
                return sendErrorResponse(res, {
                    code: 410,
                    message: "Invitation expired",
                    error: "Expired"
                });

            return sendSuccessResponse(res, {
                code: 200,
                message: "Invitation is valid",
                data: {
                    partnerId: invitation.partnerId,
                    partnerName: invitation.partner.companyName,
                    parentId: invitation.parentId,
                    expiryAt: invitation.expiryAt
                }
            });
        } catch (error) {
            logger.error({
                message: "Error validating invitation",
                object: error
            });

            return sendErrorResponse(res, {
                code: 500,
                message: "Unable to validate invitation",
                error: "Internal Server Error"
            });
        }
    }

    /**
     * Accept Invite
     */
    async acceptInvite(req: Request, res: Response) {
        try {
            const encryptedId= req.params.encryptedId || "";
            const decodedId = EncryptionUtilInstance.decrypt(encryptedId);
            const invitationId = Number(decodedId);

            const invitation = await this.ParentService.findInvitationById(invitationId);
            if (!invitation)
                return sendErrorResponse(res, {
                    code: 404,
                    message: "Invitation not found",
                    error: "Invalid Invite"
                });

            if (new Date(invitation.expiryAt) < new Date())
                return sendErrorResponse(res, {
                    code: 410,
                    message: "Invitation expired",
                    error: "Expired"
                });

            if (invitation.status !== "PENDING")
                return sendErrorResponse(res, {
                    code: 400,
                    message: `Invitation already ${invitation.status.toLowerCase()}`,
                    error: "Already Processed"
                });

            // Update invitation + link parent to partner
            await this.ParentService.acceptInvitation(invitationId);

            return sendSuccessResponse(res, {
                code: 200,
                message: "Invitation accepted successfully"
            });
        } catch (error) {
            logger.error({
                message: "Error accepting invitation",
                object: error
            });

            return sendErrorResponse(res, {
                code: 500,
                message: "Unable to accept invitation",
                error: "Internal Server Error"
            });
        }
    }

    /**
     * Reject Invite
     */
    async rejectInvite(req: Request, res: Response) {
        try {
            const encryptedId = req.params.encryptedId || "";
            const decodedId = EncryptionUtilInstance.decrypt(encryptedId);
            const invitationId = Number(decodedId);

            const invitation = await this.ParentService.findInvitationById(invitationId);
            if (!invitation)
                return sendErrorResponse(res, {
                    code: 404,
                    message: "Invitation not found",
                    error: "Invalid Invite"
                });

            if (invitation.status !== "PENDING")
                return sendErrorResponse(res, {
                    code: 400,
                    message: `Invitation already ${invitation.status.toLowerCase()}`,
                    error: "Already Processed"
                });

            await this.ParentService.rejectInvitation(invitationId);

            return sendSuccessResponse(res, {
                code: 200,
                message: "Invitation rejected"
            });
        } catch (error) {
            logger.error({
                message: "Error rejecting invitation",
                object: error
            });

            return sendErrorResponse(res, {
                code: 500,
                message: "Unable to reject invitation",
                error: "Internal Server Error"
            });
        }
    }

    /**
 * Get All Invitations with Filters, Pagination, Sorting, and Statistics
 */
async getInvitationsList(req: Request, res: Response) {
    try {
        const partner = req.user;
        
        // Extract query parameters
        const {
            page = '1',
            limit = '10',
            sortBy = 'createdAt',
            sortOrder = 'desc',
            status,
            parentName,
            startDate,
            endDate
        } = req.query;

        // Parse pagination
        const pageNum = Math.max(1, parseInt(page as string));
        const limitNum = Math.min(100, Math.max(1, parseInt(limit as string)));
        const skip = (pageNum - 1) * limitNum;

        // Build filters
        const filters: any = {
            partnerId: partner.partnerId,
            deletedAt: null
        };

        // Status filter
        if (status && ['PENDING', 'ACCEPTED', 'REJECTED'].includes(status as string)) {
            filters.status = status;
        }

        // Parent name filter
        if (parentName && typeof parentName === 'string' && parentName.trim()) {
            filters.parent = {
                user: {
                    name: {
                        contains: parentName.trim(),
                        
                    }
                }
            };
        }

        // Date range filter
        if (startDate || endDate) {
            filters.createdAt = {};
            
            if (startDate) {
                const start = new Date(startDate as string);
                if (!isNaN(start.getTime())) {
                    filters.createdAt.gte = start;
                }
            }
            
            if (endDate) {
                const end = new Date(endDate as string);
                if (!isNaN(end.getTime())) {
                    // Set to end of day
                    end.setHours(23, 59, 59, 999);
                    filters.createdAt.lte = end;
                }
            }
        }

        // Validate sort field
        const allowedSortFields = ['createdAt', 'expiryAt', 'status', 'parentActionAt'];
        const sortField = allowedSortFields.includes(sortBy as string) ? sortBy : 'createdAt';
        const order = sortOrder === 'asc' ? 'asc' : 'desc';

        // Get statistics and invitations in parallel
        const [invitations, totalCount, statistics] = await Promise.all([
            this.ParentService.getInvitationsList({
                filters,
                skip,
                take: limitNum,
                sortBy: sortField as string,
                sortOrder: order
            }),
            this.ParentService.getInvitationsCount(filters),
            this.ParentService.getInvitationsStatistics(partner.partnerId)
        ]);

        // Calculate pagination metadata
        const totalPages = Math.ceil(totalCount / limitNum);
        const hasNextPage = pageNum < totalPages;
        const hasPrevPage = pageNum > 1;

        return sendSuccessResponse(res, {
            code: 200,
            message: "Invitations retrieved successfully",
            data: {
                invitations,
                statistics,
                pagination: {
                    currentPage: pageNum,
                    totalPages,
                    totalCount,
                    limit: limitNum,
                    hasNextPage,
                    hasPrevPage
                }
            }
        });
    } catch (error) {
        logger.error({
            message: "Error fetching invitations list",
            object: error
        });

        return sendErrorResponse(res, {
            code: 500,
            message: "Unable to fetch invitations",
            error: "Internal Server Error"
        });
    }
}

}