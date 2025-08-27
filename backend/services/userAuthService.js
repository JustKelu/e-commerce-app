const { createUser, findUserByEmail } = require("../repositories/userRepository");
const { pswHasher, pswComparer } = require("../utils/hashPassword");

const registerUserService  = async (userData) => {
    const existingUser = await findUserByEmail(userData.email);
    if (existingUser) {
        const err = new Error("Email alredy exists");
        err.statusCode = 409;
        throw err;
    }
    const passwordHash = await pswHasher(userData.password);

    const newUser = await createUser({
        ...userData,
        passwordHash
    });

    return newUser;
};

const loginUserService  = async (userData) => {
    const user = await findUserByEmail(userData.email);
    if (!user) {
        const err = new Error("Wrong email or password!");
        err.statusCode = 401;
        throw err;
    }

    const result = await pswComparer(userData.password, user.password_hash);
    
    if (!result) {
        const err = new Error("Wrong email or password!");
        err.statusCode = 401;
        throw err;
    }

    return user;
};

module.exports = { registerUserService, loginUserService };