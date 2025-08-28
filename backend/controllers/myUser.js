const myUserService = require('../services/myUserService');

const getProfile = async (req, res, next) => {
    try {
        const profileService = myUserService({ userId: req.userId, userType: req.userType });
        const profile = await profileService.getProfile();
        res.json(profile);
    } catch (err) {
        next(err);
    }
}

module.exports = { getProfile, };