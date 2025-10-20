const shipmentsService = require('../../services/orders/shipmentsService');

const shipments = async (req, res, next) => {
    const service = shipmentsService(req.adminType);
    try {
        const response = await service.getShipments();
        res.json(response);
    } catch (err) {
        next(err);
    }
}

const confirmShipment = async (req, res, next) => {
    const service = shipmentsService(req.adminType);
    try {
        const orderId = req.body.orderId;
        const trackingNumber = req.body.trackingNumber;

        const response = await service.confirmShipment(orderId, trackingNumber);
        res.json(response);
    } catch (err) {
        next(err);
    }
}

module.exports = {
    shipments,
    confirmShipment,
};