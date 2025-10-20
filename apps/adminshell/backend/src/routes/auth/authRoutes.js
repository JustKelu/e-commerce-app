const express = require('express');
const router = express.Router();

const { login, authVerify  } = require('../../controllers/auth/loginAdmin');
const verifyToken = require('../../middlewares/auth/verifyToken');

router.post('/login', /*loginLimiter, verifyToken, loginValidator,*/ login);
router.get('/verify-token', verifyToken, authVerify);
//router.post('/refresh', /*loginLimiter, refreshToken*/);

module.exports = router;