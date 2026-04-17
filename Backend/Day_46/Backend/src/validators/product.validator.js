import { body, validationResult } from "express-validator";

function validateRequest(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
}

export const createProductValidator = [
    body("title").trim().notEmpty().withMessage("Title is required"),
    body("description").trim().notEmpty().withMessage("Description is required"),
    body("priceAmount").isFloat({ min: 0 }).withMessage("Price amount must be a positive number"),
    body("priceCurrency").isIn(['USD', 'EUR', 'GBP', 'INR', 'JPY', 'CNY']).withMessage("Price currency must be one of: USD, EUR, GBP, INR, JPY, CNY"),
    body().custom((value, { req }) => {
        if (!req.files || req.files.length === 0) {
            throw new Error("At least one image is required");
        }
        return true;
    }),
    validateRequest
]