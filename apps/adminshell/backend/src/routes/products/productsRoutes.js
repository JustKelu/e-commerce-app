const express = require('express');
const router = express.Router();

const verifyToken = require('../../middlewares/auth/verifyToken');
const { getProduct, approveProduct, deleteProduct, products } = require('../../controllers/products/products')

router.get('/product/:id', verifyToken, getProduct);
router.put('/product/:id', verifyToken, approveProduct);
router.delete('/product/:id', verifyToken, deleteProduct);
router.get('/products', verifyToken, products);

module.exports = router;