import User from "../models/user.model.js";

export const findUserByEmail = async (email) => {
    return await User.findOne({ email });
  };

export const findUserById = async (userId) => {
    return await User.findById(userId).select("-password"); 
  };
  

export const findUserByGoogleId = async (googleId) => {
  return await User.findOne({ googleId });
};

export const createUser = async ({ username, email, password, photo, userType}) => {
    const user = new User({ username, email, password, photo,userType});
    return await user.save();
  };

export const updateUserById = async (id, updates) => {
    return await User.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
  };

export const deleteUserById = async (id) => {
    return await User.findByIdAndDelete(id);
  };

export const findAllUsers = async () => {
    return await User.find();
};

export const upgradeToPremium = async (id) => {
  return await User.findByIdAndUpdate(id, { userType: "premium" }, { new: true, runValidators: true });
};

export const addFavoriteRecipe = async (userId, recipeId) => {
  const user = await User.findByIdAndUpdate(
    userId,
    { $addToSet: { favoriteRecipes: recipeId } }, 
    { new: true, runValidators: true }
  ).populate({
    path: "favoriteRecipes",
    populate: {
      path: "author", 
      select: "username"  
}
    }); 


  return user;
};

export const removeFavoriteRecipe = async (userId, recipeId) => {
  return await User.findByIdAndUpdate(
      userId,
      { $pull: { favoriteRecipes: recipeId } },
      { new: true, runValidators: true }
  ).populate("favoriteRecipes");
};

export const getFavoriteRecipes = async (userId) => {
  return await User.findById(userId).populate("favoriteRecipes");
};

  
export default {
    findUserByEmail,
    findUserById,
    createUser,
    updateUserById,
    deleteUserById,
    findUserByGoogleId,
    upgradeToPremium,
    addFavoriteRecipe,
    removeFavoriteRecipe,
    getFavoriteRecipes,
  };
