import { prisma } from "./../config/db.js";

/**
 * @function getMovies - retrives all movies within the database movie table.
 * @param {Object} req 
 * @param {Object} res 
 * @returns 
 */
async function getMovies(req, res) {
    const userId = req.user.id;

    if (!userId) {
        return res.status(401).json({ error: "Unauthorized user request." });
    }

    const movies = await prisma.movie.findMany({
        orderBy: [
            { title: 'asc' },
            { createdAt: 'desc' },
        ]
    });

    if (!movies) {
        return res.status(404).json({error: "Invalid request, no movies exist."});
    }

    res.status(200).json({
        status: "success",
        data: movies
    });
}

export { getMovies };