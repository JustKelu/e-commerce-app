const cartService = require("../services/myCartService");

const getCart = async (req, res, next) => {
    try {
        const service = cartService(req);
        if (service.error) return res.status(403).json(service);
        const cart = await service.getCartService();
        res.json({ cart });
    } catch (err) {
        console.log(err)
        next(err);
    }
};

const addCart = async (req, res, next) => {
    try {
        const service = cartService(req);
        if (service.error) return res.status(403).json(service);
        const userData = {
            productId: req.body.productId,
            quantity: req.body.quantity,
        };
        const cart = await service.addCartService(userData);
        res.json({ cart });
    } catch (err) {
        console.log(err)
        next(err);
    }
};

const removeCart = async (req, res, next) => {
    try {
        const service = cartService(req);
        if (service.error) return res.status(403).json(service);

        const cart = await service.removeCartService(req.body.productId);
        res.json({ cart });
    } catch (err) {
        console.log(err)
        next(err);
    }
};

const checkout = async (req, res, next) => {
    try {
        const service = cartService(req);
        if (service.error) return res.status(403).json(service);
        const response = await service.checkoutService(req.body.productsData, req.body.shipmentData);
        res.json({ response });
    } catch (err) {
        console.log(err)
        next(err);
    }
};

module.exports = { getCart, addCart, removeCart, checkout };