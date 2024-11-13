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
      user: {
        id: user._id,
        username: user.username,
        photo: user.photo,
        userType: user.userType
      },
      token,
    };
  };

export const getAllUsers = async () => {
  return await userRepository.findAllUsers();
};

export const loginWithGoogle = async (googleToken) => {
  const ticket = await client.verifyIdToken({
    idToken: googleToken,
    audience: config.googleClientId, 
  });
  const payload = ticket.getPayload();

  const { sub, email, name, picture } = payload;

  let user = await userRepository.findUserByGoogleId(sub);

  if (!user) {
    user = await userRepository.createUser({
      username: name,
      email,
      photo: picture,
      googleId: sub
    });
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
};

export const upgradeUserToPremium = async (id) => {
  return await userRepository.upgradeToPremium(id);
};


