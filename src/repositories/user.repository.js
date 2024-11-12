import User from "../models/user.model.js";

export const findUserByEmail = async (email) => {
    return await User.findOne({ email });
  };

export const findUserById = async (id) => {
    return await User.findById(id);
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
  
export default {
    findUserByEmail,
    findUserById,
    createUser,
    updateUserById,
    deleteUserById,
    findUserByGoogleId
  };