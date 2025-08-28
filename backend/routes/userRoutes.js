const express = require('express');
const router = express.Router();

const verifyToken = require('../middlewares/verifyToken');

const { getProfile } = require("../controllers/myUser");

const { getCart, addCart } = require('../controllers/myCart');

router.get('/profile', verifyToken, getProfile);
router.get('/cart', verifyToken, getCart);
router.post('/add-cart', verifyToken, addCart);

module.exports = router;