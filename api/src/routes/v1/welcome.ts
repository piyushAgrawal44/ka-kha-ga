import { Router } from "express";
import { sendSuccessResponse } from "../../utils/response";
import { config } from "../../config";

const router = Router();

router.get("/", (req, res)=>{
    return sendSuccessResponse(res, {code: 200, message: `Radhe Radhe ! Welcome to ${config.appName} - Kids progress tracking APIs V1`})
})
export default router;
