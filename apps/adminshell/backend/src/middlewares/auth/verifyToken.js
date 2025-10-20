const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
    try {
        const accessToken = req.cookies.accessToken;
        if (!accessToken) return res.status(401).json({ error: "Token missing" });

        const payload = jwt.verify(accessToken, JWT_SECRET);

        req.adminId = payload.adminId;
        req.adminType = payload.adminType;
        
        next();
    } catch (err) {
        res.status(403).json({ error: "Invalid token" });
    }
}

module.exports = verifyToken;