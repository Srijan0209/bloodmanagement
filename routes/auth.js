import express from 'express';
import {
  registerController,
  loginController,
  currentUserController
} from '../controllers/register.js';
import authmiddlewares from '../middlewares/authmiddlewares.js';

const router = express.Router();

/**
 * User Routes
 */

// Register User
router.post('/register', registerController);

// Login User
router.post('/login', loginController);

// Get Current User (Protected Route)
router.get('/current-user', authmiddlewares, currentUserController);

export default router;

