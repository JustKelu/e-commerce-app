const express = require('express');
const router = express.Router();

const validateRegister = require("../middlewares/validators/auth/validateRegister");
const validateLogin = require("../middlewares/validators/auth/validateLogin");
const verifyToken = require('../middlewares/verifyToken');
const { loginLimiter, registerLimiter } = require('../middlewares/rateLimiting');

const { registerUser, loginUser, authVerify, logoutUser } = require('../controllers/shared/myAuth');
const refreshToken = require('../middlewares/refreshToken');

router.post('/register', registerLimiter, validateRegister, registerUser);
router.post('/login', validateLogin, loginUser);
router.get('/verify-token', verifyToken, authVerify);
router.post('/refresh-token', loginLimiter, refreshToken);
router.post('/logout', logoutUser);

module.exports = router;