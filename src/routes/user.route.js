import express from "express";
import {register, login,getUsers, loginWithGoogle} from "../controllers/user.controller.js";
import { userLoginValidationRules,userRegisterValidationRules } from "../validators/user.validator.js";
import validate from "../middlewares/validation.middleware.js";
import checkAdmin from "../middlewares/checkAdmin.middleware.js";

const router = express.Router();

router.post("/register", userRegisterValidationRules, validate, register);
router.post("/login", userLoginValidationRules, validate, login);
router.post("/auth/google",userLoginValidationRules,validate,loginWithGoogle)
router.get("/", getUsers); // tengo que recordar que solo sera para admins luego de hacer las pruebas

export default router;