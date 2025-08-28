const userRepo = require("../repositories/myUserRepo");

const userService = async (userData) => {

    const getProfile = async () => {
        const repo = userRepo(userData);
        const data = await repo.getProfile(userData);
        return data;
    }

    return { getProfile };
}

module.exports = userService;