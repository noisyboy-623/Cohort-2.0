import { Router } from "express";
import { registerUser } from "../controllers/authController.js";
import { registerValidation } from "../validation/auth.validator.js";

const authRouter = Router();
authRouter.post(
  "/register",
  registerValidation,
  registerUser,
);

export default authRouter;
