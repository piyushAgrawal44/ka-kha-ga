import { Router } from "express";
import { UserController } from "../../../controllers/user.js";
import { AuthMiddleware } from "../../../middlewares/authenticateRequest.js";
import { Validate } from "../../../middlewares/validateRequest.js";
import ParentInviteValidation from "../../../validators/parent/sendInvite.js";
import { RoleCheck } from "../../../middlewares/roleCheck.js";
import { ParentController } from "../../../controllers/parent/parent.js";

const router = Router();

router.get("/invite", AuthMiddleware.verifyToken, RoleCheck.allow("PARTNER"), async (req, res) => {
    const PC = new ParentController();
    return await PC.getInvitationsList(req, res);
});

router.post("/send-invite", AuthMiddleware.verifyToken, RoleCheck.allow("PARTNER"), Validate.schema(ParentInviteValidation.sendInviteSchema), async (req, res) => {
    const PC = new ParentController();
    return await PC.sendInvite(req, res);
});

router.get("/invite/:encryptedId/validate", Validate.schema(ParentInviteValidation.validateInviteSchema), async (req, res) => {
    const PC = new ParentController();
    return await PC.validateInvite(req, res);
});

router.post("/invite/:encryptedId/accept", Validate.schema(ParentInviteValidation.acceptInviteSchema), async (req, res) => {
    const PC = new ParentController();
    return await PC.acceptInvite(req, res);
});

router.post("/invite/:encryptedId/reject", Validate.schema(ParentInviteValidation.rejectInviteSchema), async (req, res) => {
    const PC = new ParentController();
    return await PC.rejectInvite(req, res);
});

export default router;
