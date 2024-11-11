import express from "express";
import { getRecipes, RecipeById, createRecipe, updateRecipe, deleteRecipe,getRecipesByTag } from "../controllers/recipe.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import validate from "../middlewares/validation.middleware.js";
import checkAdmin from "../middlewares/checkAdmin.middleware.js";
import { recipeValidationRules } from "../validators/recipe.validator.js";

const router = express.Router();

router.post("/", authMiddleware, recipeValidationRules, validate, createRecipe);
router.get("/", getRecipes);
router.get("/:id", checkAdmin,RecipeById);
router.put("/:id", authMiddleware,checkAdmin, recipeValidationRules, validate, updateRecipe);
router.delete("/:id", authMiddleware,checkAdmin, deleteRecipe);
router.get("/tag/:tag",getRecipesByTag);

export default router;