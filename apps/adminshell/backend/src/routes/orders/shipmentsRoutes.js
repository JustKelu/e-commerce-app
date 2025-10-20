const express = require('express');
const router = express.Router();

const verifyToken = require('../../middlewares/auth/verifyToken');
const { shipments, confirmShipment } = require('../../controllers/orders/shipments');

router.get('/shipments', verifyToken, shipments);
router.post('/ship-order', verifyToken, confirmShipment);

module.exports = router;