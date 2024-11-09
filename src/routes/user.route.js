import express from "express";
import {register, login,getUsers} from "../controllers/user.controller.js";
import { userLoginValidationRules,userRegisterValidationRules } from "../validators/user.validator.js";
import validate from "../middlewares/validation.middleware.js";

const router = express.Router();

router.post("/register", userRegisterValidationRules, validate, register);
router.post("/login", userLoginValidationRules, validate, login);
router.get("/", getUsers);

export default router;