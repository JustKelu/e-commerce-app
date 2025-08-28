const pool = require("../utils/database");

const cartRepo = (userId) => {
    const getCartRepo = async () => {
        const query = `
            SELECT products.name, carts.quantity, products.price
            FROM carts
            INNER JOIN products ON carts.product_id = products.id 
            WHERE carts.user_id = $1
            ` 

        const values = [userId];

        try {
            const data = await pool.query(query, values);

            return {result: data.rows};
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
    return { getCartRepo, addCartRepo };
}


module.exports = cartRepo;