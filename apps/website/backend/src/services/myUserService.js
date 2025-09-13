const userRepo = require("../repositories/myUserRepo");

const userService = (userData) => {

    const getProfile = async () => {
        if (userData.userType !== 'customer') return {code: 403, error: "Only customer can use gift card"}
        const repo = userRepo(userData.userId);
        const data = await repo.getProfile();
        return data;
    }

    const getBalance = async () => {
        const repo = userRepo(userData.userId);
        const balance = await repo.getBalance();
        return balance;
    }

    const addBalance = async (giftCard) => {
        if (userData.userType !== 'customer') return {code: 403, error: "Only customer can use gift card"}
        const repo = userRepo(userData.userId);
        const result = await repo.addBalance(giftCard);
        return result;
    }

    return { getProfile, getBalance, addBalance };
}

module.exports = userService;