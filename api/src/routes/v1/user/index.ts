import { Router } from "express";
import { UserController } from "../../../controllers/user.js";
import { AuthValidation } from "../../../validators/authValidation.js";
import { Validate } from "../../../middlewares/validateRequest.js";

const router = Router();


router.post("/", Validate.body(AuthValidation.registerSchema), async (req, res) => {
    const US = new UserController();
    return await US.create(req, res);
});


router.post("/generate-auth-token", Validate.body(AuthValidation.loginSchema), async (req, res) => {
    const US = new UserController();
    return await US.generateAuthToken(req, res);
});

export default router;
