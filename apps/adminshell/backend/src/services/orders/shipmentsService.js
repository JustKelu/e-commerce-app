const { getShipmentsRepo, confirmShipmentsRepo } = require('../../repositories/orders/shipmentsRepo');

const ordersService = (adminType) => {
    const getShipments = async () => {
        const error = new Error("Only admin can acces this route.");
        if (adminType !== "super" && adminType !== "base") throw error
        try {
            const response = getShipmentsRepo(); 
            return response;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
    
    const confirmShipment = async (orderId, trackingNumber) => {
        const error = new Error("Only admin can acces this route.");
        if (adminType !== "super" && adminType !== "base") throw error
        try {
            const response = confirmShipmentsRepo(orderId, trackingNumber); 
            return response;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    return {
        getShipments,
        confirmShipment,
    }
}

module.exports = ordersService;