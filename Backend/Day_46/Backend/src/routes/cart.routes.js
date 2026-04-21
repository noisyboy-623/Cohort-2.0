import { Router } from "express";
import { authenticateUser } from "../middlewares/auth.middleware.js";
import { validateAddToCart } from "../validators/cart.validator.js";
import { addToCartController } from "../controllers/cart.controller.js";

const router = Router()

router.post ("/add/:productId/:variantId", authenticateUser, validateAddToCart, addToCartController)

export default router