import { Request, Response } from "express";
import { UserService } from "../services/user.js";
import { sendErrorResponse, sendSuccessResponse } from "../utils/response.js";
import { logger } from "../utils/logger.js";
import { PasswordUtil } from "../utils/password.js";
import { UserAuthTokenPayloadType } from "../types/user.js";
import { JwtUtil } from "../utils/jwt.js";
import { PartnerService } from "../services/partner.js";
import { ParentService } from "../services/parent.js";

export class UserController {
    private userService = new UserService();
    private partnerService = new PartnerService();
    private parentService = new ParentService();

    async create(req: Request, res: Response) {
        try {

            const { name, email, password, role } = req.body;

            const existing = await this.userService.checkEmailExist(email);
            if (existing) {
                return sendErrorResponse(res, { code: 400, message: "Email id is already registered", error: "Duplicate email id" })
            }

            const hashedPassword = await PasswordUtil.hash(password);


            const user = await this.userService.createUser({ name, email, password: hashedPassword, role });

            if (role === "PARTNER") {
                const partner = await this.partnerService.createPartner({
                    companyName: name,
                    user: { connect: { id: user.userId } },
                });

                // ✅ update user.partnerId after creating partner
                await this.userService.updateUser(user.userId, {
                    partner: {
                        connect: { id: partner.partnerId }
                    }
                });
            }
            if (role === "PARENT") {
                const parent = await this.parentService.createParent({ name: name, user: { connect: { id: user.userId } } });
                // ✅ update user.partnerId after creating partner
                await this.userService.updateUser(user.userId, {
                    parent: {
                        connect: { id: parent.parentId }
                    }
                });
            }

            return sendSuccessResponse(res, { code: 201, message: "User created successfully !", data: user })
        } catch (error: any) {
            logger.error({ message: "Internal Server Error", object: error })
            return sendErrorResponse(res, { code: 501, error: "Internal Server Error", message: "Failed to create user" })
        }
    }

    async generateAuthToken(req: Request, res: Response) {
        try {

            const { email, password } = req.body;

            const existing = await this.userService.checkEmailExist(email);
            if (!existing) {
                return sendErrorResponse(res, { code: 400, message: "Invalid Credentials", error: "Invalid Credentials " })
            }

            // match password
            const passwordMatch = await PasswordUtil.compare(password, existing.password);
            if (!passwordMatch) {
                return sendErrorResponse(res, { code: 400, message: "Invalid Credentials", error: "Invalid Credentials " })
            }

            // generate auth token
            const tokenPayload: UserAuthTokenPayloadType = {
                user_id: existing.id,
                name: existing.name,
                role: existing.role,
                partnerId: existing.parentId,
                parentId: existing.parentId
            }


            const authToken = await JwtUtil.generateToken(tokenPayload);

            return sendSuccessResponse(res, { code: 200, message: "Token generation successful !", data: { token: authToken } })
        } catch (error: any) {

        }
    }

    async list(req: Request, res: Response) {
        const users = await this.userService.getAllUsers();
        return sendSuccessResponse(res, { code: 200, message: "User list fetched successfully !", data: users })
    }
}
