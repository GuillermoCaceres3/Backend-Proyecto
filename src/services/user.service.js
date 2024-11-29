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
        audience: config.googleClientId, // Tu CLIENT_ID de Google
      });
  
      // Obtiene los datos del payload
      const payload = ticket.getPayload();
      const { sub, email, name, picture } = payload;
  
      // Verifica si el usuario ya existe
      const userExists = await userRepository.findUserByEmail(email);
      if (userExists) {
        throw new UserAlreadyExistsError(); // Maneja el error si el usuario ya existe
      }
  
      // Si el usuario se registra con Google, asignamos un valor vacío para la contraseña
      const newUser = await userRepository.createUser({
        username: name,
        email,
        password: "", // Contraseña vacía, no la procesaremos ni la ciframos
        photo: picture,
        userType: 'user',
        googleId: sub, // ID de Google
      });
  
      return newUser;
  
    } catch (error) {
      console.error('Error en registerWithGoogle:', error);
      throw error; // Lanza el error para que sea manejado en el controlador
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
  return await userRepository.addFavoriteRecipe(userId, recipeId);
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


