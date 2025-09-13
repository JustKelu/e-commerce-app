const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const refreshToken = (req, res) => {
    try {
        const refresh = req.cookies.refreshToken;
        if (!refresh) return res.status(401).json({ error: "Token missing" });

        const isProd = process.env.NODE_ENV === 'production';

        const payload = jwt.verify(refresh, JWT_SECRET);
        const accessToken = jwt.sign(
            {
                userId: payload.userId,
                userType: payload.userType,
            }, JWT_SECRET, {
                expiresIn: '15m'
            }
        );
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: isProd ? true : false,
            sameSite: isProd ? 'none' : 'lax',
            path: '/',
            maxAge: 15 * 60 * 1000,
        });
        res.json({ success: true });
    } catch (err) {
        return res.status(401).json({ error: "Invalid token" });
    };
};

module.exports = refreshToken;