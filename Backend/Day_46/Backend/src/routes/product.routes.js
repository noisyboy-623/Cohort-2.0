import { Router } from "express";
import { authenticateSeller } from "../middlewares/auth.middleware.js";
import { createProduct, getAllProducts, getSellerProducts, getProductDetails, addProductVariant, deleteProductVariant } from "../controllers/product.controller.js";
import { createProductValidator } from "../validators/product.validator.js";
import multer from "multer"

const router = Router();

const upload = multer({
    storage: multer.memoryStorage(),
    limits:{
        fileSize: 5*1024*1024
    }
})

/**
 * @route POST /api/products
 * @description Create a new product
 * @access Private (Seller only)
 */
router.post('/', authenticateSeller, upload.array("images", 7), createProductValidator, createProduct)

/**
 * @route GET /api/products/seller
 * @description Get all products of the authenticated seller
 * @access Private (Seller only)
 */
router.get('/seller', authenticateSeller, getSellerProducts)

router.get('/', getAllProducts)
router.get('/detail/:id', getProductDetails)
router.post('/:productId/variants', authenticateSeller, upload.array("images", 7), addProductVariant)
router.delete('/:productId/variants/:variantId', authenticateSeller, deleteProductVariant)

export default router
