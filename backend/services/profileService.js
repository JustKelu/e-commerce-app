const { profile } = require("../repositories/profileRepository");

const profileService = async (userData) => {
    const data = await profile(userData);
    return data;
}

module.exports = profileService;
