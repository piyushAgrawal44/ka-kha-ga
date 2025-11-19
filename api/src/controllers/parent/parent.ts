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
                    INVITE_LINK: `${config.frontendAppDomain}/accept/invite/${encryptedId}`
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
}