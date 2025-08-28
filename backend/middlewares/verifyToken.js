const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: "Token missing" }); 
    }

    try {
        const data = authHeader.split(" ");
        const token = data[1];
        const payload = jwt.verify(token, JWT_SECRET);

        req.userId = payload.userId;
        req.userType = payload.userType;
        
        next();
    } catch (err) {
        return res.status(401).json({ error: "Token missing" });
    }
}

module.exports = verifyToken;