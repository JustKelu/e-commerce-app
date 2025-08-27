const cartService = require("../services/cartService");

const userCart = async (req, res, next) => {
    if (req.userType == 'business') return res.status(401).json({error: "U can't access this route"});
    try { 
        const cart = await cartService(req);
        res.json({cart});
    } catch (err) {
        next(err);
    }
} 

module.exports = userCart;