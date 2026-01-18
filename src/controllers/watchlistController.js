import { prisma } from './../config/db.js';

/**
 * @function getWatchlist - retrieves the entire watchlist linked to a particular user
 * @param {Object} req 
 * @param {Object} res 
 * @returns 
 */
async function getWatchlist(req, res) {
    const userId = req.user?.id;

    if (!userId) {
        return res.status(401).json({ error: "Unauthorized user request." });
    }

    const watchlistItems = await prisma.watchlistItem.findMany({
        where: { userId }
    });

    if (!watchlistItems) {
        return res.status(403).json({ error: "Invalid request, watch list does not exist." });
    }

    res.status(200).json({
        status: "success",
        data: watchlistItems
    });
}

/**
 * @function getWatchlistItem - retrieves a particular watchlist item 
 * from the db based on the id passed in via the params.
 * @param {Object} req 
 * @param {Object} res 
 * @returns 
 */
async function getWatchlistItem(req, res) {
    const { id } = req.params;
    const userId = req.user?.id;

    if (!userId) {
        return res.status(401).json({ error: "Unauthorized user request." });
    }

    const watchlistItem = await prisma.watchlistItem.findUnique({
        where: { id, userId }
    });

    if (!watchlistItem) {
        return res.status(404).json({ error: "Invalid request, watchlist does not exist." })
    }

    res.status(200).json({
        status: "success",
        data: {
            record: watchlistItem
        }
    });
}

/**
 * @function addToWatchlist - creates/add a new item to the watchlist table 
 * @param {Object} req 
 * @param {Object} res 
 * @returns 
 */
async function addToWatchlist(req, res) {
    const { movieId, status, rating, notes } = req.body;
    const userId = req.user?.id;

    if (!userId) {
        return res.status(401).json({ error: "Unauthorized user request." })
    }

    // Validate if movie exists
    const movie = await prisma.movie.findUnique({
        where: { id: movieId }
    });

    if (!movie) {
        return res.status(404).json({ error: "Invalid request: movie does not exist." });
    }

    //Validate if movie exists in watchlist
    const movielistItem = await prisma.watchlistItem.findUnique({
        where: {
            userId_movieId: { userId, movieId }
        }
    });

    if (movielistItem) {
        return res.status(400).json({ error: "Invalid request: movie already exists in the watchlist." });
    }

    try {
        const watchlistItem = await prisma.watchlistItem.create({
            data: {
                userId,
                movieId,
                status: status || "PLANNED",
                rating: Number(rating),
                notes: notes
            }
        });

        res.status(201).json({
            status: "success",
            data: { watchlistItem }
        });
    } catch (error) {
        console.error(error);
        return res.status(403).json({
            error: "Invalid request, create failed."
        });
    }
}

/**
 * @function updateWatchlistItem - updates a particular watch list item based on the param id passed in.
 * @param {Object} req 
 * @param {Object} res 
 * @returns 
 */
async function updateWatchlistItem(req, res) {
    const { status, rating, notes } = req.body;
    const { id } = req.params;
    const userId = req.user?.id;

    if (!userId) {
        return res.status(401).json({ error: "Unauthorized user request." })
    }

    const watchListItem = await prisma.watchlistItem.findUnique({
        where: { id, userId }
    });

    if (!watchListItem) {
        return res.status(403).json({ error: "Invalid request, movie does not exist." })
    }

    const updateData = {};
    if (status != null) updateData.status = status.toUpperCase();
    if (rating != null) updateData.rating = Number(rating);
    if (notes != null) updateData.notes = notes;

    if (Object.keys(updateData).length === 0) {
        return res.status(400).json({ error: "No valid fields provided for update." });
    }

    try {
        const movieListItem = await prisma.watchlistItem.update({
            where: {
                id, userId
            },
            data: updateData
        });

        res.status(200).json({
            status: "success",
            data: {
                updatedItem: movieListItem
            }
        });

    } catch (error) {
        console.error(error);
        return res.status(403).json({
            error: "Invalid request, update failed."
        });
    }
}

/**
 * @function removeWatchlistItem - deletes a particular watchlist item from the db based
 * on the param id passed in.
 * @param {Object} req 
 * @param {Object} res 
 * @returns 
 */
async function removeWatchlistItem(req, res) {
    const { id } = req.params;
    const userId = req.user?.id;

    if (!userId) {
        return res.status(401).json({ error: "Unauthorized user request." })
    }

    const watchlistItem = await prisma.watchlistItem.findUnique({
        where: { id, userId }
    });

    if (!watchlistItem) {
        return res.status(403).json({ error: "Invalid request, movie does not exist." })
    }

    await prisma.watchlistItem.delete({
        where: { id, userId }
    });

    res.status(200).json({
        status: "success",
        data: {
            message: "Record deleted sucessfully."
        }
    });
}

export { addToWatchlist, getWatchlist, getWatchlistItem, removeWatchlistItem, updateWatchlistItem };