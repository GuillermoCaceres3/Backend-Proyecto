import express from "express";
import { getRecipes, RecipeById, createRecipe, updateRecipe, deleteRecipe,getRecipesByTag, getUserRecipes } from "../controllers/recipe.controller.js";
import {authMiddleware,optionalAuthMiddleware }from "../middlewares/auth.middleware.js";
import validate from "../middlewares/validation.middleware.js";
import checkAdmin from "../middlewares/checkAdmin.middleware.js";
import { recipeValidationRules } from "../validators/recipe.validator.js";
import checkPremium from "../middlewares/checkPremium.middleware.js"
import upload from "../middlewares/photos.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, upload.array('photos'),recipeValidationRules, validate, createRecipe);
router.get("/",optionalAuthMiddleware, getRecipes);
router.get('/my-recipes',authMiddleware,getUserRecipes);
router.get("/:id", authMiddleware,checkAdmin,RecipeById);
router.put("/:id", authMiddleware,checkAdmin, recipeValidationRules, validate, updateRecipe);
router.delete("/:id", authMiddleware,deleteRecipe);
router.get("/tag/:tag",optionalAuthMiddleware,getRecipesByTag);

export default router;