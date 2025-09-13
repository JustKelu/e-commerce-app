const cartRepo = require("../repositories/myCartRepo");

const cartService = (data) => {
    if (data.userType !== 'customer') return { error: "Only customers can have a cart." };

    const repo = cartRepo(data.userId);

    const getCartService = async () => {
        const cart = await repo.getCartRepo();
        return cart;
    }

    const addCartService = async (userData) =>  {
        const cart = await repo.addCartRepo(userData);
        return cart;
    }

    const removeCartService = async (productId) =>  {
        const cart = await repo.removeCartRepo(productId);
        return cart;
    }

    const checkoutService = async (productsData, shipmentData) => {
        try {
            const totalsWithVat = await repo.checkoutRepo();
            
            if (totalsWithVat.length <= 0) {
                throw new Error('Invalid cart or price');
            }

            let checkoutTotal = 0;
            let commissionTotal = 0;
            let customersTotals = [];

            totalsWithVat.forEach(total => {
                let sellerTotal = parseFloat(total.total_with_vat);
                let commission = sellerTotal * 0.05;

                checkoutTotal += sellerTotal;
                commissionTotal += commission;
                customersTotals.push({seller_id: total.seller_id, amount: Math.round((sellerTotal - commission) * 100) / 100});
            });

            checkoutTotal = Math.round(checkoutTotal * 100) / 100;
            commissionTotal = Math.round(commissionTotal * 100) / 100;

            const cartItems = await repo.getCartRepo();
            const result = await repo.transactionRepo(checkoutTotal, commissionTotal, customersTotals, cartItems, shipmentData);

            return {result};

        } catch (err) {
            throw new Error(`Checkout failed: ${err.message}`);
        }
    }

    return { getCartService, addCartService, removeCartService, checkoutService };
}

module.exports = cartService;