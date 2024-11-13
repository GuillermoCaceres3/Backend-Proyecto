import * as recipeRepository from "../repositories/recipe.repository.js";

export const createNewRecipe = async (title, description, ingredients, steps, prepTime, cookTime, servings, tags, author,isExclusive) => {
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
    });
    return newRecipe;
};

export const getAllRecipes = async (filter) => {
    return await recipeRepository.findAllRecipes(filter);
};


export const getRecipeById = async (id) => {
    return await recipeRepository.findRecipeById(id);
}

export const updateRecipe = async (id, title, description, ingredients, steps, prepTime, cookTime, servings, tags, author) => {
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
    });

    return updatedRecipe;
}

export const deleteRecipe = async (id) => {
    return await recipeRepository.deleteRecipe(id);
}

export const getRecipesByTag = async (tag) => {
    return await recipeRepository.recipeByTag(tag);
}