import { Router } from "express";
import welcomeRoute from "./welcome";
import userRoute from "./user/index";
const router = Router();

router.use("/welcome", welcomeRoute);
router.use("/user", userRoute);

export default router;
