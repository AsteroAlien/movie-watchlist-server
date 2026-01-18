import express from 'express';
import { addToWatchlist, getWatchlist, getWatchlistItem, removeWatchlistItem, updateWatchlistItem } from '../controllers/watchlistController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { validateRequestMiddleware } from '../middleware/validateRequest.js';
import { addToWatchlistSchema, updateWatchlistSchema } from '../validators/watchlistValidators.js';

const router = express.Router();

router.use(authMiddleware);
router.get('/', getWatchlist);
router.post('/', validateRequestMiddleware(addToWatchlistSchema), addToWatchlist);
router.get('/:id', getWatchlistItem);
router.put('/:id',validateRequestMiddleware(updateWatchlistSchema), updateWatchlistItem);
router.delete('/:id', removeWatchlistItem);

export default router;