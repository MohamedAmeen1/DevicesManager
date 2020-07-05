const jwt = require('jsonwebtoken')
require('dotenv').config();

async function auth(req, res, next) {
    const token = req.header('authToken');
    if (!token) return res.status(401).send({ message: 'acces denied . no token provided' })
    try {
        const { id, x } = jwt.verify(token, process.env.user_private_key)
        req.user_id = id;
        next();
    }
    catch (ex) {
        res.status(401).send({ message: 'Invalid Token' })
    }
}
module.exports = auth