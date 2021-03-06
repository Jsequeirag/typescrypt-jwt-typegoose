import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
/* -------------------------------------------------------------------------- */
/*                                    auth                                    */
/* -------------------------------------------------------------------------- */

/* ---------------------------------- error handler---------------------------------- */
export const authErrorHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
/* --------------------------------- signup --------------------------------- */
export const signupValidateSchema = [
  body("username").exists().isLength({ min: 5, max: 10 }),
  body("email").isEmail(),
  body("password").exists().isLength({ min: 6, max: 10 }),
];
/* --------------------------------- signin --------------------------------- */
export const signinValidateSchema = [body("email").isEmail().exists()];
