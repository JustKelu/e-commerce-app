const ordersService = require('../../services/orders/ordersService');

const profit = async (req, res, next) => {
    const service = ordersService(req.adminType);
    try {
        const response = await service.getProfit();
        res.json(response);
    } catch (err) {
        next(err);
    }
}

const orders = async (req, res, next) => {
    const service = ordersService(req.adminType);
    try {
        const response = await service.getOrders();
        res.json(response);
    } catch (err) {
        next(err);
    }
}

const confirmOrder = async (req, res, next) => {
    const service = ordersService(req.adminType);
    try {
        const response = await service.confirmOrder(req.body.orderId);
        res.json({success: true, messagge: response});
    } catch (err) {
        next(err);
    }
}

module.exports = {
    profit,
    orders,
    confirmOrder,
};