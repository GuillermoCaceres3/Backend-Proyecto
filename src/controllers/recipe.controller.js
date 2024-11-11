import * as recipeService from '../services/recipe.service.js';

export const createRecipe = async (req, res) => { 
    const {title, description, ingredients, steps, prepTime, cookTime, servings, tags} =  req.body;
    const author = req.user.id;

    try {
        const newRecipe = await recipeService.createNewRecipe(title, description, ingredients, steps, prepTime, cookTime, servings, tags, author);
        res.status(201).json({message:'Recipe created successfully', recipe: newRecipe});
    } catch (error) {
        res.status(500).json({message:'Error creating recipe', error: error.message});
    }
};

export const getRecipes = async (req, res) => {
    try {
        const recipes = await recipeService.getAllRecipes();
        res.json(recipes);
    } catch (error) {
        res.status(500).json({message:'Error getting recipes', error: error.message});
    }
}

export const getRecipesByTag = async (req, res) => {
    const { tag } = req.params;
    try {
        const recipes = await recipeService.getRecipesByTag(tag);
        res.json(recipes);
    } catch (error) {
        res.status(500).json({message:'Error getting recipes by tag', error: error.message});
    }
}

export const RecipeById = async (req, res) => {
    const { id } = req.params;
    try {
        const recipe = await recipeService.getRecipeById(id);
        res.json(recipe);
    } catch (error) {
        res.status(404).json({message:'Error getting recipe', error: error.message});
    }
}

export const updateRecipe = async (req, res) => {
    const { id } = req.params;
    const { title, description, ingredients, steps, prepTime, cookTime, servings, tags } = req.body;
    const author = req.user.id; 
  
    try {
      const updatedRecipe = await recipeService.updateRecipe(
        id,
        title,
        description,
        ingredients,
        steps,
        prepTime,
        cookTime,
        servings,
        tags,
        author
      );
      res.json({ message: 'Recipe updated successfully', recipe: updatedRecipe });
    } catch (error) {
      res.status(500).json({ message: 'Error updating recipe', error: error.message });
    }
  };

export const deleteRecipe = async (req, res) => {
    const { id } = req.params;

    try {
        await recipeService.deleteRecipe(id);
        res.json({message:'Recipe deleted successfully'});
    } catch (error) {
        res.status(500).json({message:'Error deleting recipe', error: error.message});
    }
}
