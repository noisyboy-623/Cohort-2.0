import { body, validationResult } from "express-validator";

const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  res.status(400).json({
    errors: errors.array(),
  });
};

export const registerValidation = [
  body("username").isString().withMessage("username should be string"),
  body("email").isEmail().withMessage("Email not valid"),
  body("password").custom((value)=>{
    if(value.length < 6){
        throw new Error("Password should be atleast 6 characters long")
    }
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).+$/
    if(!passwordRegex.test(value)) {
     throw new Error("Password should contain atleast one uppercase letter and one number")
    }
     return true
  }).withMessage("Password should be at least 6 characters long and contain atleast one uppercase letter and one number"),
  validate,
];
