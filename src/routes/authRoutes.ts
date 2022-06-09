import { Router } from "express";
import { verifyToken } from "../libs/verifyToken";
const router = Router();
import { signIn, profile, signUp } from "../controllers/authControllers";
import {
  authErrorHandler,
  signinValidateSchema,
  signupValidateSchema,
} from "../validators/authValidators";
router.post("/signin", signinValidateSchema, authErrorHandler, signIn);
router.post("/signup", signupValidateSchema, authErrorHandler, signUp);
router.get("/profile", [verifyToken], profile);
export default router;
