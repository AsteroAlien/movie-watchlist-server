import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import {getMovies} from './../controllers/movieController.js';

const router = express.Router();

router.use(authMiddleware);
router.get('/', getMovies);

export default router;