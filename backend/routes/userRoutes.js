const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/authMiddleware');

const profileUser = require("../controllers/profileUser");

const userCart = require('../controllers/userCart');
const userAddCart = require('../controllers/userAddCart');

router.get('/profile', authMiddleware, profileUser);
router.get('/cart', authMiddleware, userCart); //da finire
router.get('/add-cart', authMiddleware, userAddCart);

module.exports = router;