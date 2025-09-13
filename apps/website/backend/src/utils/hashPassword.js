const bcrypt = require('bcrypt');

const pswHasher = async (psw) => {
    const hashedPsw = await bcrypt.hash(psw, 12);
    return hashedPsw;
}

const pswComparer = async (psw, hashedPsw) => {
    const result = await bcrypt.compare(psw, hashedPsw);
    return result;
}

module.exports = { pswHasher, pswComparer };