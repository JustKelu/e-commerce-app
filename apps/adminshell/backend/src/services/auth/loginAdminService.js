const loginAdminRepo = require('../../repositories/auth/loginAdminRepo');
const accessTokenService = require('./accessTokenService');
const pswComparer = require('../../utils/pswComparer');

const loginAdminService = async (adminCredentials) => {
    try {
        const adminData = await loginAdminRepo(adminCredentials.email);
        if (!adminData) throw Error("Credenziali d'accesso errate");

        const result = await pswComparer(adminCredentials.password, adminData.password_hash);
        if (!result) throw Error("Credenziali d'accesso errate");

        const tokens = await accessTokenService(adminData);

        return tokens;
    } catch (err) {
        throw err
    }
}

module.exports = loginAdminService;