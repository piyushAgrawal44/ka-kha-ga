import { Request, Response } from "express";
import { ParentService } from "../../services/parent/parent";
import { sendErrorResponse, sendSuccessResponse } from "../../utils/response";
import { logger } from "../../utils/logger";
import EmailService from "../../services/email/emailService";
import { db } from "../../config/database";

export class ParentController {
    protected ParentService = new ParentService();
    protected EmailService = new EmailService(db);

    /**
     * Function to send invite to parent
     */
    async sendInvite(req: Request, res: Response) {

        try {
            const parentInputEmail = req.body.email;
            const partnerId = req.user?.partnerId;

            const parent = await this.ParentService.getParentByEmail(parentInputEmail);
            if (!parent) return sendErrorResponse(res, { code: 404, message: "Parent not found for given email address", error: "Parent Not Found" });

            // TODO: send invite
            this.EmailService.sendEmail({recipientName: parent.name, to: parent.email, templateType: "PARENT_INVITE", variables: {"NAME":parent.name, "PARTNER_NAME": req.user?.name, "INVITE_LINK":"https://google.com/" }});

            return sendSuccessResponse(res, { code: 201, message: "Invite sent successfully", data: parent })
        } catch (error) {
            logger.error({ message: "Error sending invite to parent", object: error });
            return sendErrorResponse(res, { code: 501, message: "Failed to send invitation to parent. Please try again later", error: "Internal Server Error" })
        }

    }
}