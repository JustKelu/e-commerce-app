const userService = require('../../services/myUserService');

const getProfile = async (req, res, next) => {
    try {
        const profileService = userService({ userId: req.userId, userType: req.userType });
        const profile = await profileService.getProfile();
        if (profile.code === 403) {
            return res.status(profile.code).json({error: profile.error});
        }
        res.json(profile);
    } catch (err) {
        next(err);
    }
}

const getBalance = async (req, res, next) => {
    try {
        const profileService = userService({ userId: req.userId, userType: req.userType });
        const balance = await profileService.getBalance();
        if (balance.code === 403) {
            console.log(req.userType)
            console.log(balance.error)
            return res.status(balance.code).json({error: balance.error});
        }
        res.json(balance)
    } catch (err) {
        next(err);
    }
} 

const addBalance = async (req, res, next) => {
    try {
        const profileService = userService({ userId: req.userId, userType: req.userType });
        const balance = await profileService.addBalance(req.body.giftCard);
        if (balance.code === 403) {
            return res.status(balance.code).json({error: balance.error});
        }
        res.json(balance)
    } catch (err) {
        next(err);
    }
} 

module.exports = { getProfile, getBalance, addBalance };