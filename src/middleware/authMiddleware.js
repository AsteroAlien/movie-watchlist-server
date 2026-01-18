import jwt from 'jsonwebtoken';
import { prisma } from './../config/db.js';

//read the token from the request and validate it
/**
 * @function authMiddleware - responsible for reading the token info
 * from the request and validating/verifying its authenticity.
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 * @returns 
 */
async function authMiddleware(req, res, next) {
    const authorizationField = req.headers["authorization"];

    let token;
    if (authorizationField && authorizationField.startsWith("Bearer")) {
        token = authorizationField.split(" ")[1];
    } else if (req.cookies?.jwt) {
        token = req.cookies.jwt;
    }

    if (!token) {
        return res.status(401).json({ error: "Unauthorized request, no token provided." })
    }

    try {
        //verify token is valid
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded.id) {
            return res.status(401).json({ error: "Invalid token payload." });
        }

        // verify user still exists
        const user = await prisma.user.findUnique({ where: { id: decoded.id } });
        if (!user) {
            return res.status(401).json({ error: "Unauthorized: user no longer exists" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({
            error: "Invalid or expired token."
        });
    }
}

export { authMiddleware }