const dashboardService = require('../../services/orders/dashboardService');

const recentOrders = async (req, res, next) => {
    try {
        const service = dashboardService(req.adminType);
        const response = await service.getRecentOrders();

        res.json({success: true, result: response});
    } catch (err) {
        next(err);
    }
}

module.exports = {
    recentOrders,
}