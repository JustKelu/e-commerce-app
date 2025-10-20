const myOrdersRepo = require('../../../repositories/customer/myOrdersRepo');

const getOrders = async (userData) => {
    if (userData.userType !== 'customer') throw Error('Only customers can access this route');
    try {
        const response = await myOrdersRepo.getOrders(userData.userId);
        return response
    } catch (err) {
        console.log(err);
        return err;
    }
}

module.exports = getOrders;