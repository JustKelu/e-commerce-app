const profileService = require('../services/profileService');

const profileUser = async (req, res, next) => {
    try {
        const profile = await profileService(req);
        res.json(profile);
    } catch (err) {
        next(err);
    }
}

module.exports = profileUser;