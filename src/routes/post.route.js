import express from 'express';
import {
  createPost,
  getAllPosts,
  getUserPosts,
  deletePost
} from '../controllers/post.controller.js';
import {authMiddleware,optionalAuthMiddleware }from "../middlewares/auth.middleware.js";
import { postValidationRules } from '../validators/post.validator.js';
import validate from '../middlewares/validation.middleware.js';

const router = express.Router();
  
router.post('/', authMiddleware, postValidationRules, validate, createPost);
router.get('/', getAllPosts);
router.get('/user', authMiddleware, getUserPosts);
router.delete('/:id', authMiddleware,deletePost);
        
export default router;
