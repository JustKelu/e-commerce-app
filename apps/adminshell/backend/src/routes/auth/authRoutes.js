const express = require('express');
const router = express.Router();

const loginAdmin = require('../../controllers/auth/loginAdmin');

router.post('/login', /*loginLimiter, verifyToken, loginValidator,*/ loginAdmin);
//router.post('/refresh', /*loginLimiter, refreshToken*/);

module.exports = router;