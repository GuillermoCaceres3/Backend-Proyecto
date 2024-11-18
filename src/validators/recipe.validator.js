import { body } from 'express-validator';

export const recipeValidationRules = [
  body("title")
    .isString()
    .notEmpty()
    .withMessage("Title is required"),

  body("description")
    .isString()
    .notEmpty()
    .withMessage("Description is required"),

  body("ingredients")
    .isArray({ min: 1 })
    .withMessage("Ingredients are required and should be an array"),

  body("ingredients.*.name")
    .isString()
    .notEmpty()
    .withMessage("Each ingredient must have a name"),

  body("ingredients.*.quantity")
    .isString()
    .notEmpty()
    .withMessage("Each ingredient must have a quantity"),

  body("ingredients.*.unit")
    .isString()
    .notEmpty()
    .withMessage("Each ingredient must have a unit"),

  body("steps")
    .isArray({ min: 1 })
    .withMessage("Steps are required and should be an array"),

  body("steps.*.stepNumber")
    .isString()
    .notEmpty()
    .withMessage("Each step must have a step number"),

  body("steps.*.instruction")
    .isString()
    .notEmpty()
    .withMessage("Each step must have an instruction"),

  body("prepTime")
    .isInt({ min: 0 })
    .withMessage("Preparation time must be a positive integer"),

  body("cookTime")
    .isInt({ min: 0 })
    .withMessage("Cook time must be a positive integer"),

  body("servings")
    .isInt({ min: 1 })
    .withMessage("Servings must be an integer greater than 0"),

  body("tags")
    .isArray()
    .optional()
    .withMessage("Tags should be an array of strings"),

  body("tags.*")
    .isString()
    .withMessage("Each tag should be a string"),

  body("isExclusive")
    .isBoolean()
    .optional()
    .withMessage("isExclusive should be a boolean value"),

  body("photos")
    .isArray({ min: 3, max: 3 })
    .withMessage("Photos must be an array with exactly 3 items"),

  body("photos.*")
    .isString()
    .notEmpty()
    .withMessage("Each photo must be a valid string"),
];
