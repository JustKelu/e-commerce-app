const { loginService, registerService } = require('../services/myAuthService');

const loginUser = async (req, res, next) => {
    try {
        const user = await loginService(req.body);
        const token = user.token;

        res.status(201).json({
            message: "Login succesful",
            token,
        });

    } catch (err) {
        next(err);
    };
};

const registerUser = async (req, res, next) => {
    try {
        const user = await registerService(req.body);
        res.status(201).json({
            message: "Registration succesful",
            user
        });

    } catch (err) {
        next(err)
    }
}

const authVerify = (req, res) => {
    res.status(200).json({id: req.userId, userType: req.userType});
}

module.exports = { loginUser, registerUser, authVerify };