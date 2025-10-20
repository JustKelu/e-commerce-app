const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

const verifyToken = require('../middlewares/verifyToken');
const validateProduct = require("../middlewares/validators/validateProduct");

const getNotifications  = require('../controllers/business/myNotifications');

const { getMyProducts, addMyProduct, updateMyProduct, deleteMyProduct } = require('../controllers/business/myProducts');

const { getBalance } = require('../controllers/customer/myUser');

router.get('/notifications', verifyToken, getNotifications);

router.get('/my-products', verifyToken, getMyProducts);
router.post('/add-product', verifyToken, /*validateProduct,*/ 
    upload.array('images', 4), 
    addMyProduct
);
router.put('/my-products/:id', verifyToken, validateProduct, updateMyProduct);
router.delete('/my-products/:id', verifyToken, deleteMyProduct);

router.get('/my-profit', verifyToken, getBalance);

module.exports = router;