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

            const parent = await this.ParentService.getParentByEmail(parentInputEmail);
            if (!parent) return sendErrorResponse(res, { code: 404, message: "Parent not found for given email address", error: "Parent Not Found" });



            // 3. Insert invitation
            const expiryAt = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000); // 2 days

            const invitation = await this.ParentService.createPartnerParentInvitation({
                partner: { connect: { id: partner.id } },
                parent: { connect: { id: parent.id } },
                expiryAt
            });


            const encryptedId = EncryptionUtilInstance.encrypt(invitation.invitationId.toString());

            // 4. Send email
            await this.EmailService.sendEmail({
                recipientName: parent.name,
                to: parent.email,
                templateType: "PARENT_INVITE",
                variables: {
                    NAME: parent.name,
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
}