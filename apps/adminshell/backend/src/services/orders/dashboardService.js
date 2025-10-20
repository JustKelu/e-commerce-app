const recentOrdersRepo = require('../../repositories/orders/dashboardRepo');

const dashboardService = (adminType) => {
    if (adminType !== 'base' && adminType !== 'super') throw new Error('Solo gli admin possono accedere a questa rotta.');

    const getRecentOrders = async () => {
        try {
            const response = await recentOrdersRepo();

            return response;
        } catch (err) {
            console.log(err);
            throw new Error('Impossibile ricevere gli ordini recenti')
        }
    }

    return {
        getRecentOrders,
    }
}

module.exports = dashboardService;