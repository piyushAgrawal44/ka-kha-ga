import { Router } from "express";
import { UserController } from "../../../controllers/user";

const router = Router();

router.get("/", (req, res) => {
    const US = new UserController();
    return US.list(req, res);
})

router.post("/", (req, res) => {
    const US = new UserController();
    return US.create(req, res);
})
export default router;
