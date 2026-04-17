import { Router } from "express";
import { authenticateSeller } from "../middlewares/auth.middleware.js";
import { createProduct } from "../controllers/product.controller.js";
import { createProductValidator } from "../validators/product.validator.js";
import multer from "multer"

const router = Router();

const upload = multer({
    storage: multer.memoryStorage(),
    limits:{
        fileSize: 5*1024*1024
    }
})

router.post('/', authenticateSeller, upload.array("images", 7), createProductValidator, createProduct)

export default router
