import { Router } from "express";
import welcomeRoute from "./welcome.js";
import userRoute from "./user/index.js";
import parentRoute from "./parent/index.js";
const router = Router();

router.use("/welcome", welcomeRoute);
router.use("/user", userRoute);
router.use("/parent", parentRoute);

export default router;
