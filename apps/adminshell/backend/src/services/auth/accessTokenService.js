const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

const accessTokenService = async (userData) => {
    try {
        console.log(userData)

        const accessToken = jwt.sign({
            adminId: userData.id,
            adminType: userData.type,
            type: 'access' 
        }, JWT_SECRET, {
            expiresIn: '15m', 
            /*issuer: 'app-name',
            subject: userData.adminId.toString()*/
        });
        
        const refreshToken = jwt.sign({
            adminId: userData.id,
            adminType: userData.type,
            type: 'refresh'
        }, JWT_REFRESH_SECRET, { 
            expiresIn: '8h', 
            /*issuer: 'app-name',
            subject: userData.adminId.toString()*/
        });

        const tokens = {accessToken, refreshToken};

        return tokens;
    } catch (err) {
        throw err
    }
};

module.exports = accessTokenService;