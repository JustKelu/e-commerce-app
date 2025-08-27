const { loginUserService } = require('../services/userAuthService');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const loginUser = async (req, res, next) => {
    try {
        const user = await loginUserService(req.body);
        const token = jwt.sign(
            {
                userId: user.id,
                userType: user.user_type,
            }, JWT_SECRET);

        res.status(201).json({
            message: "Login succesful",
            token,
        });

    } catch (err) {
        next(err);
    };
};

module.exports = loginUser;