
/**
 * @function home - returns home page html
 * @param {Object} req 
 * @param {Object} res 
 */
async function home(req, res) {
    const homeHTML = `
        <h1>Hello World</h1>
    `
    res.status(200).send(homeHTML);
}

export {home};