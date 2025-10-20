const pool = require("../utils/database");
const paymentService = require('../services/customer/payments');
const orderService = require('../services/customer/orders');
const shipmentService = require('../services/customer/shipments');

const cartRepo = (userId) => {
    const getCartRepo = async () => {
        const query = `
            SELECT p.seller_id, p.name, c.quantity, p.price, p.id, pi.image_url
            FROM carts c
            INNER JOIN products p ON c.product_id = p.id
            INNER JOIN product_images pi ON p.id = pi.product_id AND pi.is_primary = true
            WHERE c.user_id = $1
            ` 

        const values = [userId];

        try {
            const data = await pool.query(query, values);
            return data.rows;
        } catch (err) {
            console.log(`Error on getting cart items from user ${userId}: ${err}`);
            return {error: "Internal error."};
        }
    }

    const addCartRepo = async (userData) => {
    const query = `
                INSERT INTO carts (user_id, product_id, quantity)
                VALUES ($1, $2, $3)
                ON CONFLICT (user_id, product_id)
                DO UPDATE SET quantity = carts.quantity + EXCLUDED.quantity
            `;

        const values = [
            userId,
            userData.productId,
            userData.quantity,
        ]

        try {
            await pool.query(query, values);
            return {success: true};
        } catch (err) {
            console.log(`Error on adding products to ${userId} user's cart: ${err}`);
            return {success: false, error: "Internal error."};
        }

    }

    const removeCartRepo = async (productId) => {
    const query = `DELETE FROM carts WHERE product_id = $1 AND user_id = $2`;

        const values = [productId, userId]

        try {
            await pool.query(query, values);
            return {success: true};
        } catch (err) {
            console.log(`Error on removing products to ${userId} user's cart: ${err}`);
            return {success: false, error: "Internal error."};
        }

    }

    const checkoutRepo = async () => {
        const query = `
            SELECT 
                p.seller_id,
                SUM(p.price * c.quantity) * 1.22 as total_with_vat
            FROM carts c
            JOIN products p ON c.product_id = p.id
            WHERE c.user_id = $1
            GROUP BY p.seller_id;
        `
        const results = await pool.query(query, [userId]);
        return results.rows;
    }

    const transactionRepo = async (checkoutTotal, commissionTotal, customersTotals, cartItems, shipmentData) => {
        if (!customersTotals || customersTotals.length === 0) {
            throw new Error('No customers to update');
        }

        const client = await pool.connect();

        await client.query('SET statement_timeout = 30000'); 
        await client.query('BEGIN');

        try {
            const result = await paymentService.debitUserBalance(client, checkoutTotal, userId);
            if (result.rowCount === 0) {
                throw new Error('Insufficient funds or user not found');
            }
            
            await paymentService.creditSellers(client, customersTotals);
            await paymentService.recordCommission(client, commissionTotal);

            const orderResult = await orderService.createOrder(client, checkoutTotal, userId);
            const orderId = orderResult.rows[0].id;

            await orderService.insertOrderItems(client, cartItems, orderId);
            await orderService.subtractOrderItems(client, cartItems);
        
            await shipmentService.createShipment(client, shipmentData, orderId);

            await orderService.notifySellers(client, cartItems);

            await client.query('COMMIT');
        } catch (error) {
            await client.query('ROLLBACK');
            if (error.message.includes('statement timeout')) {
                throw new Error('Transaction timeout - please try again');
            }
            throw error;
        } finally {
            client.release(); 
        }
    };

    return { getCartRepo, addCartRepo, removeCartRepo, checkoutRepo, transactionRepo };
}


module.exports = cartRepo;