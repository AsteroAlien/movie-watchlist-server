import jwt from 'jsonwebtoken';

async function generateToken(userId, res) {
    const payload = { id: userId };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
   
    res.cookie("jwt", token, {
        httpOnly: true,
        sercure: process.env.NODE_ENV === "production",
        sameStrict: "strict",
        maxAge: (1000 * 60 * 60 * 24)
    });
    
    return token;
}

export { generateToken };