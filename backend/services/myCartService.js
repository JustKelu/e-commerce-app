const cartRepo = require("../repositories/myCartRepo");

const cartService = (data) => {
    if (data.userType !== 'customer') return { error: "Only customers can have a cart." };

    const userId = data.userId;

    const repo = cartRepo(userId);

    const getCartService = async () => {
        const cart = await repo.getCartRepo();
        return cart;
    }

    const addCartService = async (userData) =>  {
        const cart = await repo.addCartRepo(userData);
        return cart;
    }

    return { getCartService, addCartService };
}

module.exports = cartService;