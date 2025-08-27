const cartRepository = require("../repositories/cartRepository");

const cartService = async (userData) => {
    const cart = await cartRepository(userData);
    return cart;
}

module.exports = cartService;