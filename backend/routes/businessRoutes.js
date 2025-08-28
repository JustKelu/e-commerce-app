const express = require('express');
const router = express.Router();

const verifyToken = require('../middlewares/verifyToken');
const validateProduct = require("../middlewares/validateProduct");

const { getMyProducts, addMyProduct, updateMyProduct, deleteMyProduct } = require('../controllers/myProducts');

router.get('/my-products', verifyToken, getMyProducts);
router.post('/add-product', verifyToken, validateProduct, addMyProduct);
router.put('/my-products/:id', verifyToken, validateProduct, updateMyProduct);
router.delete('/my-products/:id', verifyToken, deleteMyProduct);

module.exports = router;