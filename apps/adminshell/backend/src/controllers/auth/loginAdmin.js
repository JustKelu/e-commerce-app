const loginAdminService = require('../../services/auth/loginAdminService');

const loginAdmin = async (req, res, next) => {
    try {
        const adminCredentials = {
            email: req.body.email,
            password: req.body.password
        }

        const response = await loginAdminService(adminCredentials);

        res.cookie('accessToken', response.accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            path: '/',                             
            maxAge: 15 * 60 * 1000,
        });

        res.cookie('refreshToken', response.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            path: '/',
            maxAge: 8 * 60 * 60 * 1000,
        });

        res.json({success: true, message: 'Login eseguito con successo'});
    } catch (err) {
        next(err);
    }
}

module.exports = loginAdmin;