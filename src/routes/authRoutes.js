import express from 'express';
import { register, login, logout } from './../controllers/authController.js';
import { validateRequestMiddleware } from '../middleware/validateRequest.js';
import { loginSchema, registerSchema } from '../validators/authValidators.js';

const router = express.Router();

router.post('/register',validateRequestMiddleware(registerSchema), register);
router.post('/login',validateRequestMiddleware(loginSchema), login);
router.post('/logout', logout);

export default router;