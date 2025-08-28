const express = require('express');
const router = express.Router();

const validateRegister = require("../middlewares/validateRegister");
const validateLogin = require("../middlewares/validateLogin");
const verifyToken = require('../middlewares/verifyToken');

const { registerUser, loginUser, authVerify } = require('../controllers/myAuth');

router.post('/register', validateRegister, registerUser);
router.post('/login', validateLogin, loginUser);
router.get('/verify-token', verifyToken, authVerify);

module.exports = router;