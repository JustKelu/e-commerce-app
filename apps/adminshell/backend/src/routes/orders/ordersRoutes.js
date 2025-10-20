const express = require('express');
const router = express.Router();

const verifyToken = require('../../middlewares/auth/verifyToken');
const { profit, orders, confirmOrder } = require('../../controllers/orders/orders');

router.get('/profit', verifyToken, profit);
router.get('/orders', verifyToken, orders);
router.post('/process-order', verifyToken, confirmOrder);

module.exports = router;