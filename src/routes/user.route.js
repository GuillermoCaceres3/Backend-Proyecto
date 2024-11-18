import express from "express";
import {register, login,getUsers, loginWithGoogle,addFavoriteRecipe,removeFavoriteRecipe,getFavoriteRecipes,deleteUserById} from "../controllers/user.controller.js";
import { userLoginValidationRules,userRegisterValidationRules } from "../validators/user.validator.js";
import validate from "../middlewares/validation.middleware.js";
import checkAdmin from "../middlewares/checkAdmin.middleware.js";
import {authMiddleware,optionalAuthMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", userRegisterValidationRules, validate, register);
router.post("/login", userLoginValidationRules, validate, login);
router.post("/auth/google",userLoginValidationRules,validate,loginWithGoogle)
router.get("/", getUsers); // tengo que recordar que solo sera para admins luego de hacer las pruebas
router.post("/favorites", authMiddleware, addFavoriteRecipe); 
router.delete("/favorites", authMiddleware, removeFavoriteRecipe); 
router.get("/favorites", authMiddleware, getFavoriteRecipes); 
router.delete("/:id", authMiddleware,checkAdmin, deleteUserById); 

export default router;  