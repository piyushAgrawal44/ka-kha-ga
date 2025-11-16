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
                userId: existing.id,
                name: existing.name
            }



            const authToken = await JwtUtil.generateToken(tokenPayload);

            return sendSuccessResponse(res, { code: 200, message: "Token generation successful !", data: { token: authToken, user: existing } })
        } catch (error: any) {

        }
    }

    async list(req: Request, res: Response) {
        const users = await this.userService.getAllUsers();
        return sendSuccessResponse(res, { code: 200, message: "User list fetched successfully !", data: users })
    }

    async getUserDetail(req: Request, res: Response) {
        try {
            // req.user comes from JWT decoded payload
            const userId = req?.user?.userId;

            const user = await this.userService.getUserById(userId);

            if (!user) {
                return sendErrorResponse(res, {
                    code: 404,
                    message: "User not found",
                    error: "Invalid user"
                });
            }

            // Never send sensitive info (password, tokens)
            return sendSuccessResponse(res, {
                code: 200,
                message: "Authenticated user fetched successfully",
                data: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    partnerId: user.partnerId,
                    parentId: user.parentId
                }
            });
        } catch (error) {
            logger.error({ message: "Failed to fetch authenticated user", object: error })
            return sendErrorResponse(res, {
                code: 500,
                message: "Failed to fetch authenticated user",
                error: "Failed to fetch authenticated user",
            });
        }
    }

}
