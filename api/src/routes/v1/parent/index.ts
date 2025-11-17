import { Router } from "express";
import { UserController } from "../../../controllers/user.js";
import { AuthMiddleware } from "../../../middlewares/authenticateRequest.js";
import { Validate } from "../../../middlewares/validateRequest.js";
import ParentInviteValidation from "../../../validators/parent/sendInvite.js";
import { RoleCheck } from "../../../middlewares/roleCheck.js";
import { ParentController } from "../../../controllers/parent/parent.js";

const router = Router();


router.post("/send-invite", AuthMiddleware.verifyToken, RoleCheck.allow("PARTNER"), Validate.schema(ParentInviteValidation.inviteSchema), async (req, res) => {
    const PC = new ParentController();
    return await PC.sendInvite(req, res);
});

export default router;
