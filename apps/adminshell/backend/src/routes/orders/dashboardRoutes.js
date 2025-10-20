const express = require('express');
const router = express.Router();

const verifyToken = require('../../middlewares/auth/verifyToken');
const { recentOrders } = require('../../controllers/orders/dashboard');

router.get('/recent-orders', verifyToken, recentOrders)

module.exports = router;