const cartAddRepository = require("../repositories/cartAddRepository");

const cartAddService = async (userData) => {
    const cart = await cartAddRepository(userData);
    return cart;
}

module.exports = cartAddService;