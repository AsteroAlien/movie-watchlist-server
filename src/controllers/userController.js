import { prisma } from './../config/db.js';

/**
 * @function getUser - gets user information for a particular user.
 * @param {Object} req 
 * @param {Object} res 
 * @returns 
 */
async function getUser(req, res) {
    const userId = req.user.id;

    if (!userId) {
        return res.status(401).json({ error: "Unauthorized user request." });
    }

    const user = await prisma.user.findUnique({
        where: {
            id: userId
        }
    });

    if (!user) {
        return res.status(404).json({error: "Invalid request, user does not exist."});
    }

    res.status(200).json({
        status: "success",
        data: user
    });
}

export { getUser }