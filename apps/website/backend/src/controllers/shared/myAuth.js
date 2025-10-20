const { loginService, registerService } = require('../../services/shared/myAuthService');

const loginUser = async (req, res, next) => {
    try {
        const user = await loginService(req.body);

        res.cookie('accessToken', user.accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            path: '/',                             
            maxAge: 15 * 60 * 1000,
        });

        res.cookie('refreshToken', user.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            path: '/',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.json({
            message: "Login successful",
            userType: user.userType
        });

    } catch (err) {
        next(err);
    };
};

const logoutUser = (req, res) => {
    res.cookie('accessToken', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        path: '/',  
        expires: new Date(0) 
    });
    
    res.cookie('refreshToken', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        path: '/',  
        expires: new Date(0)
    });
    
    res.json({ message: "Logout successful" });
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

module.exports = { loginUser, logoutUser, registerUser, authVerify };