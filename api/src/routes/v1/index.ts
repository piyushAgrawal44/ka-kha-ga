import { Router } from "express";
import welcomeRoute from "./welcome.js";
import userRoute from "./user/index.js";
const router = Router();

router.use("/welcome", welcomeRoute);
router.use("/user", userRoute);

export default router;
