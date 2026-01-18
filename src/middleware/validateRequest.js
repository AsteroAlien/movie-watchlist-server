/**
 * @function validateRequestMiddleware - responsible for validating the req body 
 * content before making the server requests.
 * @param {JSON} schema 
 * @returns 
 */
function validateRequestMiddleware(schema) {
    return (req, res, next) => {
        const result = schema.safeParse(req.body);

        if (!result.success) {
            const errorMessages = result.error.issues.map((err) => err.message);
            const errorMessage = errorMessages.join(", ");
            return res.status(400).json({ error: errorMessage })
        }

        next();
    };
}

export { validateRequestMiddleware };