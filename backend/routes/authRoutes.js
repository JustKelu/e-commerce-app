const express = require('express');
const router = express.Router();

const registerUser = require("../controllers/registerUser");
const validateRegister = require("../middlewares/validateRegister");

const loginUser = require("../controllers/loginUser");
const validateLogin = require("../middlewares/validateLogin");

const authMiddleware = require('../middlewares/authMiddleware');
const authVerify = require('../controllers/authController');

router.post('/register', validateRegister, registerUser);
router.post('/login', validateLogin, loginUser);
router.get('/verify-token', authMiddleware, authVerify);

module.exports = router;