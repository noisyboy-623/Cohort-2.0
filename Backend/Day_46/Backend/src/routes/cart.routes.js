import { Router } from "express";
import { authenticateUser } from "../middlewares/auth.middleware.js";
import { validateAddToCart } from "../validators/cart.validator.js";
import {
  addToCartController,
  getCart,
  removeFromCart,
  updateCartQuantity,
} from "../controllers/cart.controller.js";

const router = Router();

router.post("/add/:productId/:variantId", authenticateUser, validateAddToCart, addToCartController);
router.get("/", authenticateUser, getCart);
router.delete("/:itemId", authenticateUser, removeFromCart);
router.patch("/:itemId", authenticateUser, updateCartQuantity);

export default router;