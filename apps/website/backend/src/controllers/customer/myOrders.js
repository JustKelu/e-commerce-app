const orders = require('../../services/customer/orders');

const myOrders = async (req, res, next) => {
    try {
        const userData = {
            userId: req.userId,
            userType: req.userType,
        }
        const response = await orders.getOrders(userData);
        res.json({success: true, response: response});
    } catch (err) {
        console.log(err)
        next(err)
    }
}

module.exports = myOrders;