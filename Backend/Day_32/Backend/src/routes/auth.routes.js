import {Router} from "express";
import { registerValidator,loginValidator } from "../validator/auth.validator.js";
import { registerController, verifyEmail, loginController, getMeController } from "../controllers/auth.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";

const authRouter = Router()

authRouter.post("/register", registerValidator, registerController)
authRouter.get("/verify-email", verifyEmail)
authRouter.post("/login", loginValidator, loginController)
authRouter.get("/get-me", authUser, getMeController)

export default authRouter; 