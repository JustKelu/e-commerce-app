const limiter = require('express-rate-limit');

const loginLimiter = limiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5,
    message: "Too many requests from this IP, please try again after 15 minutes"
});

const registerLimiter = limiter({
    windowMs: 60 * 60 * 1000, 
    max: 3,
    message: "Too many accounts created from this IP, please try again after an hour"
});

module.exports = { loginLimiter, registerLimiter };