import { Router } from "express";
import { sendSuccessResponse } from "../../utils/response.js";
import { config } from "../../config/index.js";

const router = Router();

router.get("/", (req, res)=>{
    return sendSuccessResponse(res, {code: 200, message: `Radhe Radhe ! Welcome to ${config.appName} - Kids progress tracking APIs V1`})
})
export default router;
