import * as recipeService from '../services/recipe.service.js';

export const createRecipe = async (req, res) => {


    const { title, description, ingredients, steps, prepTime, cookTime, servings, tags, isExclusive } = req.body;
    const author = req.user.id;



    try {


        const photos = req.files ? req.files.map(file => `/uploads/${file.filename}`) : [];


        const newRecipe = await recipeService.createNewRecipe(
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
            photos
        );

        res.status(201).json({ message: 'Receta creada con éxito', recipe: newRecipe });
    } catch (error) {
        console.error('Error al crear la receta:', error);
        res.status(500).json({ message: 'Error al crear la receta', error: error.message });
    }

}

export const getRecipes = async (req, res) => {
    try {
        const userType = req.user?.userType || "guest";

        const filter = (userType === "user" || userType === "guest")
            ? { isExclusive: false }
            : {};

        const recipes = await recipeService.getAllRecipes(filter);

        res.json(recipes);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch recipes', error: error.message });
    }
};


export const getRecipesByTag = async (req, res) => {
    const { tag } = req.params;
    const userType = req.user?.userType || "guest";

    const filter = (userType === "user" || userType === "guest")
        ? { isExclusive: false }
        : {};

    try {
        const recipes = await recipeService.getRecipesByTag(tag, filter);
        res.json(recipes);
    } catch (error) {
        res.status(500).json({ message: 'Error getting recipes by tag', error: error.message });
    }
}

export const RecipeById = async (req, res) => {
    const { id } = req.params;
    try {
        const recipe = await recipeService.getRecipeById(id);
        res.json(recipe);
    } catch (error) {
        res.status(404).json({ message: 'Error getting recipe', error: error.message });
    }
}

export const updateRecipe = async (req, res) => {
    const { id } = req.params;
    const { title, description, ingredients, steps, prepTime, cookTime, servings, tags, isExclusive, photos } = req.body;
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
            author,
            isExclusive,
            photos
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
        res.json({ message: 'Recipe deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting recipe', error: error.message });
    }
}

export const getUserRecipes = async (req, res) => {
    try {
        const userId = req.user.id;
        const recipes = await recipeService.getRecipesByUser(userId);
        res.json(recipes);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch user recipes', error: error.message });
    }
};
