import express from "express";
import { getRecipes, RecipeById, createRecipe, updateRecipe, deleteRecipe } from "../controllers/recipe.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import validate from "../middlewares/validation.middleware.js";
import { recipeValidationRules } from "../validators/recipe.validator.js";

const router = express.Router();

router.post("/", authMiddleware, recipeValidationRules, validate, createRecipe);
router.get("/", getRecipes);
router.get("/:id", RecipeById);
router.put("/:id", authMiddleware, recipeValidationRules, validate, updateRecipe);
router.delete("/:id", authMiddleware, deleteRecipe);

export default router;