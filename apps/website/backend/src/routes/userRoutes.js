const express = require('express');
const router = express.Router();

const verifyToken = require('../middlewares/verifyToken');

const { getProfile, getBalance, addBalance } = require("../controllers/customer/myUser");

const { getCart, addCart, removeCart, checkout } = require('../controllers/customer/myCart');

const getOrders = require('../controllers/customer/myOrders');

const { getProduct, getProducts } = require('../controllers/customer/myProducts');

const { getReviews, newReview } = require('../controllers/customer/myReviews');

router.get('/profile', verifyToken, getProfile);

router.get('/my-orders', verifyToken, getOrders);

router.get('/balance', verifyToken, getBalance);
router.post('/balance', verifyToken, addBalance);

router.post('/add-cart', verifyToken, addCart);
router.get('/cart', verifyToken, getCart);
router.delete('/remove-cart', verifyToken, removeCart);
router.post('/checkout', verifyToken, checkout)

router.get('/products', getProducts);
router.get('/product/:id', getProduct);

//router.get('/reviews', getReviews);
//router.post('/review', newReview);

module.exports = router;