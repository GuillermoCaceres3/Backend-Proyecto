import * as userRepository from '../repositories/user.repository.js';
import jwt from 'jsonwebtoken';
import { config } from '../config/config.js';
import { UserAlreadyExistsError, InvalidCredentialsError } from '../errors/errors.js';
import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client(config.googleClientId);


export const registerUser = async ({ username, email, password, photo, userType }) => {
    const userExists = await userRepository.findUserByEmail(email);
    if (userExists) {
      throw new UserAlreadyExistsError();
    }
  
    const newUser = await userRepository.createUser({
      username,
      email,
      password,
      photo,
      userType
    });
    return newUser;
  };

  export const registerWithGoogle = async (googleToken) => {
    try {
      const ticket = await client.verifyIdToken({
        idToken: googleToken,
        audience: config.googleClientId, 
      });
  
      const payload = ticket.getPayload();
      const { sub, email, name, picture } = payload;
  
      const userExists = await userRepository.findUserByEmail(email);
      if (userExists) {
        throw new UserAlreadyExistsError(); 
      }
  
      const newUser = await userRepository.createUser({
        username: name,
        email,
        password: "", 
        photo: picture,
        userType: 'user',
        googleId: sub, 
      });
  
      return newUser;
  
    } catch (error) {
      console.error('Error en registerWithGoogle:', error);
      throw error; 
    }
  };
  
    
  
  export const loginUser = async ({ email, password }) => {
    const user = await userRepository.findUserByEmail(email);
    if (!user || !(await user.comparePassword(password))) {
      throw new InvalidCredentialsError();
    }
  
    const token = jwt.sign(
      { id: user._id, username: user.username, userType: user.userType },
      config.jwtSecret,
      {
        expiresIn: '1h',
      }
    );
  
    return {
      token,
    };
  };

export const getAllUsers = async () => {
  return await userRepository.findAllUsers();
};

export const loginWithGoogle = async (googleToken) => {
  try {
    const ticket = await client.verifyIdToken({
      idToken: googleToken,
      audience: config.googleClientId, 
    });

    const payload = ticket.getPayload();
    const { sub, email, name, picture } = payload;

    let user = await userRepository.findUserByEmail(email);

    if (!user) {
      throw new Error('Usuario no registrado con Google.');
    }

    const jwtToken = jwt.sign(
      { id: user._id, username: user.username, userType: user.userType },
      config.jwtSecret,
      { expiresIn: '1h' }
    );


    return {
      user: {
        id: user._id,
        username: user.username,
        photo: user.photo,
        userType: user.userType,
      },
      token: jwtToken,
    };
  } catch (error) {
    console.error("Error en loginWithGoogle:", error);
    throw new Error("Error en la autenticación con Google.");
  }
};



export const upgradeUserToPremium = async (id) => {
  return await userRepository.upgradeToPremium(id);
};

export const addFavorite = async (userId, recipeId) => {
  try {
    const user = await userRepository.addFavoriteRecipe(userId, recipeId);
    return user; 
  } catch (error) {
    throw new Error("Error al agregar receta a favoritos: " + error.message);
  }
};

export const removeFavorite = async (userId, recipeId) => {
  return await userRepository.removeFavoriteRecipe(userId, recipeId);
};

export const getFavorites = async (userId) => {
  return await userRepository.getFavoriteRecipes(userId);
};

export const deleteUser = async (id) => {
  return await userRepository.deleteUserById(id);
}

export const getUserById = async (userId) => {
  const user = await userRepository.findUserById(userId);
  if (!user) {
    throw new Error("Usuario no encontrado");
  }
  return user;
};




