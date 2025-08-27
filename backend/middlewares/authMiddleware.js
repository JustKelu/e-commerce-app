const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET;

const verifyToken = (data) => {
    const token = data[1];
    return jwt.verify(token, JWT_SECRET);
}

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: "Token missing" }); 
    }

    try {
        const data = authHeader.split(" ");
        const payload = verifyToken(data);

        req.userId = payload.userId;
        req.userType = payload.userType;
        
        next();
    } catch (err) {
        return res.status(401).json({ error: "Token missing" });
    }
}

module.exports = authMiddleware;