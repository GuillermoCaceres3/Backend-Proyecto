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

export const getUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error getting users', error: error.message });
    }
};
  