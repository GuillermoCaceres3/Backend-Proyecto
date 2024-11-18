import * as userService from '../services/user.service.js';
import { UserAlreadyExistsError, InvalidCredentialsError } from '../errors/errors.js';

export const register = async (req, res) => {
    const { username, email, password, photo,userType } = req.body;
  
    try {
      const result = await userService.registerUser({
        username,
        email,
        password,
        photo,
        userType
      });
  
      res.status(201).json({ message: 'User registered successfully', result });
    } catch (error) {
      if (error.code === 11000) {
        const field = Object.keys(error.keyValue)[0];
        const value = error.keyValue[field];
        return res.status(400).json({
          message: `The ${field} '${value}' is already in use.`,
        });
      }
  
      if (error instanceof UserAlreadyExistsError) {
        return res.status(400).json({ message: error.message });
      }
  
      res.status(500).json({ message: 'Error registering user', error: error.message });
    }
  };

  export const login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const loginData = await userService.loginUser({ email, password });
      res.json( loginData );
    } catch (error) {
      if (error instanceof InvalidCredentialsError) {
        return res.status(400).json({ message: error.message });
      }
  
      res.status(500).json({ message: 'Error logging in', error: error.message });
    }
  };

  export const loginWithGoogle = async (req, res) => {
    const { token } = req.body;
  
    try {
      const loginData = await userService.loginWithGoogle(token);
      res.json(loginData);
    } catch (error) {
      console.error('Error al iniciar sesión con Google:', error);
      res.status(401).json({ message: 'Invalid Google token' });
    }
  };

export const getUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error getting users', error: error.message });
    }
};

export const upgradeToPremiumController = async (req, res) => {
  const id = req.user.id; 
  try {
      const updatedUser = await userService.upgradeUserToPremium(id);
      res.status(200).json({
          message: "User upgraded to premium successfully.",
          user: updatedUser
      });
  } catch (error) {
      res.status(500).json({
          message: "Failed to upgrade user to premium.",
          error: error.message
      });
  }
};

export const addFavoriteRecipe = async (req, res) => {
  const userId = req.user.id;
  const { recipeId } = req.body;

  try {
      const user = await userService.addFavorite(userId, recipeId);
      res.json({ message: "Recipe added to favorites", favoriteRecipes: user.favoriteRecipes });
  } catch (error) {
      res.status(500).json({ message: "Failed to add recipe to favorites", error: error.message });
  }
};

export const removeFavoriteRecipe = async (req, res) => {
  const userId = req.user.id;
  const { recipeId } = req.body;

  try {
      const user = await userService.removeFavorite(userId, recipeId);
      res.json({ message: "Recipe removed from favorites", favoriteRecipes: user.favoriteRecipes });
  } catch (error) {
      res.status(500).json({ message: "Failed to remove recipe from favorites", error: error.message });
  }
};

export const getFavoriteRecipes = async (req, res) => {
  const userId = req.user.id;

  try {
      const user = await userService.getFavorites(userId);
      res.json({ favoriteRecipes: user.favoriteRecipes });
  } catch (error) {
      res.status(500).json({ message: "Failed to fetch favorite recipes", error: error.message });
  }
};

export const deleteUserById = async (req, res) => {
  const { id } = req.params;

  try {
      await userService.deleteUser(id);
      res.json({ message: "User deleted successfully" });
  } catch (error) {
      res.status(500).json({ message: "Failed to delete user", error: error.message });
  }
}
  