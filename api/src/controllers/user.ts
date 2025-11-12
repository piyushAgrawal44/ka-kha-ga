import { Request, Response } from "express";
import { UserService } from "../services/user";
import { sendErrorResponse, sendSuccessResponse } from "../utils/response";
import { logger } from "../utils/logger";
import { PasswordUtil } from "../utils/password";
import { UserAuthTokenPayloadType } from "../types/user";
import { JwtUtil } from "../utils/jwt";

export class UserController {
    private userService = new UserService();

    async create(req: Request, res: Response) {
        try {

            const { name, email, password, role } = req.body;

            const existing = await this.userService.checkEmailExist(email);
            if (existing) {
                return sendErrorResponse(res, { code: 400, message: "Email id is already registered", error: "Duplicate email id" })
            }

            const hashedPassword = await PasswordUtil.hash(password);

            const user = await this.userService.createUser({ name, email, password: hashedPassword, role });

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


            const authToken=await JwtUtil.generateToken(tokenPayload);

            return sendSuccessResponse(res, {code: 200, message: "Token generation successful !", data: { token: authToken}})
        } catch (error: any) {

        }
    }

    async list(req: Request, res: Response) {
        const users = await this.userService.getAllUsers();
        return sendSuccessResponse(res, { code: 200, message: "User list fetched successfully !", data: users })
    }
}
