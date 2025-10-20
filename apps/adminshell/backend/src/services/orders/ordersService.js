const { getProfitRepo, getOrdersRepo, confirmOrderRepo } = require('../../repositories/orders/ordersRepo');

const ordersService = (adminType) => {
    const getProfit = async () => {
        const error = new Error("Only super admin can acces this route.");
        if (adminType !== "super") throw error
        try {
            const response = getProfitRepo(); 
            return response;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    const getOrders = async () => {
        const error = new Error("Only admin can acces this route.");
        if (adminType !== "super" && adminType !== "base") throw error
        try {
            const response = getOrdersRepo(); 
            return response;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    const confirmOrder = async (orderId) => {
        const error = new Error("Only admin can acces this route.");
        if (adminType !== "super" && adminType !== "base") throw error
        try {
            const response = confirmOrderRepo(orderId); 
            return response;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    return {
        getProfit,
        getOrders,
        confirmOrder,
    }
}

module.exports = ordersService;