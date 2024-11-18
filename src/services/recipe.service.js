import * as recipeRepository from "../repositories/recipe.repository.js";

export const createNewRecipe = async (title, description, ingredients, steps, prepTime, cookTime, servings, tags, author,isExclusive,photos) => {
    const newRecipe = await recipeRepository.createRecipe({
        title,
        description,
        ingredients,
        steps,
        prepTime,
        cookTime,
        servings,
        tags,
        author,
        isExclusive,
        photos,
    });
    return newRecipe;
};

export const getAllRecipes = async (filter) => {
    return await recipeRepository.findAllRecipes(filter);
};


export const getRecipeById = async (id) => {
    return await recipeRepository.findRecipeById(id);
}

export const updateRecipe = async (id, title, description, ingredients, steps, prepTime, cookTime, servings, tags, author,isExclusive,photos) => {
    const updatedRecipe = await recipeRepository.updateRecipe(id, {
        title,
        description,
        ingredients,
        steps,
        prepTime,
        cookTime,
        servings,
        tags,
        author,
        isExclusive,
        photos,
    });

    return updatedRecipe;
}

export const deleteRecipe = async (id) => {
    return await recipeRepository.deleteRecipe(id);
}

export const getRecipesByTag = async (tag) => {
    return await recipeRepository.recipeByTag(tag);
}

export const getRecipesByUser = async (userId) => {
    return await recipeRepository.findRecipesByAuthor(userId);
};