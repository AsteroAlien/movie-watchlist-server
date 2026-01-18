import { prisma } from './../config/db.js';
import bcrypt from 'bcryptjs';
import { generateToken } from './../utils/generateToken.js';

/**
 * @function register - controller function responsible for adding a user to the db
 * @param {Object} req 
 * @param {Object} res 
 * @returns 
 */
async function register(req, res) {
    const { name, email, password } = req.body;

    const isUser = await prisma.user.findUnique({
        where: { email }
    });

    if (isUser) {
        return res.status(409).json({ error: "User account already exists with this email." });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await prisma.user.create({
        data: { name, email, password: hashedPassword }
    })

    // Generate new JWT web token
    const token = await generateToken(user.id, res);

    res.status(201).json({
        status: "success",
        data: {
            user: { id: user.id, name, email },
            token
        }
    });
}

/**
 * @function login - controller function responsible for validating the user login information.
 * and generating a valid web token for login verification 
 * @param {Object} req 
 * @param {Object} res 
 * @returns 
 */
async function login(req, res) {
    const { email, password } = req.body;

    // Validate if user exists
    const user = await prisma.user.findUnique({
        where: { email }
    });

    if (!user) {
        return res.status(401).json({ error: "Invalid email or password." });
    }

    //validate password
    const isValidUserPassword = await bcrypt.compare(password, user.password);

    if (!isValidUserPassword) {
        return res.status(401).json({ error: "Invalid email or password." })
    }

    // Generate new JWT web token
    const token = await generateToken(user.id, res);

    res.status(201).json({
        status: "success",
        data: {
            user: { id: user.id, email },
            token
        }
    });
}

/**
 * @function logout - controller function responsible for clearer the cookie information/token when logging out.
 * @param {Object} req 
 * @param {Object} res 
 */
async function logout(req, res) {
    res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0)
    });

    res.status(201).json({
        status: "success",
        message: "Logged out successfully"
    });
}

export { register, login, logout };