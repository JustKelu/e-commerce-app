const { createUser, findUserByEmail } = require("../repositories/myAuthRepo");
const { pswHasher, pswComparer } = require("../utils/hashPassword");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const loginService  = async (userData) => {
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

    const token = jwt.sign(
        {
            userId: user.id,
            userType: user.user_type,
        }, JWT_SECRET);

    return {...user, token};
};

const registerService  = async (userData) => {
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

module.exports = { loginService, registerService };