import { Request, Response } from "express";
import { UserService } from "../services/user";
import { sendErrorResponse, sendSuccessResponse } from "../utils/response";
import { logger } from "../utils/logger";

export class UserController {
    private userService = new UserService();

    async create(req: Request, res: Response) {
        try {
            const { name, email, password } = req.body;
            const user = await this.userService.createUser(name, email, password);

            return sendSuccessResponse(res, { code: 201, message: "User created successfully !", data: user })
        } catch (error: any) {
            logger.error({ message: "Internal Server Error", object: error })
            return sendErrorResponse(res, { code: 501, error: "Internal Server Error", message: "Failed to create user" })
        }
    }

    async list(req: Request, res: Response) {
        const users = await this.userService.getAllUsers();
        return sendSuccessResponse(res, { code: 200, message: "User list fetched successfully !", data: users })
    }
}
