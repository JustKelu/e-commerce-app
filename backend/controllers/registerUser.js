const { registerUserService } = require('../services/userAuthService');

const registerUser = async (req, res, next) => {
    try {
        const user = await registerUserService(req.body);
        res.status(201).json({
            message: "Registration succesful",
            user
        });

    } catch (err) {
        next(err)
    }
}

module.exports = registerUser;