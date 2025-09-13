const bcrypt = require('bcrypt');

const pswComparer = async (psw, hashedPsw) => {
    const result = await bcrypt.compare(psw, hashedPsw);
    return result;
}

module.exports = pswComparer;