import Recipe from "../models/recipe.model.js";

export const createRecipe = async (recipeData) => {
    const recipe = new Recipe(recipeData);
    return (await recipe.save()).populate('author','username email');
};

export const findAllRecipes = async () => {
    return await Recipe.find().populate('author', 'username email');
};

export const findRecipeById = async (id) => {
    return await Recipe.findById(id).populate('author', 'username email');
};

export const updateRecipe = async (id, recipeData) => {
    return await Recipe.findByIdAndUpdate(id, recipeData, {
      new: true,
      runValidators: true,
    }).populate('author', 'username email');
};

export const deleteRecipe = async (id) => {
    return await Recipe.findByIdAndDelete(id);
};