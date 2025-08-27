const pool = require("../utils/database");

const cartAddRepository = async (userData) => {
   const query = `
            INSERT INTO carts (user_id, item_id, quantity)
            VALUES ($1, $2, $3)
            ON CONFLICT (user_id, item_id)
            DO UPDATE SET quantity = carts.quantity + EXCLUDED.quantity
        `;

    const values = [
        userData.userId,
        userData.itemId,
        userData.quantity,
    ]

    try {
        await pool.query(query, values);
        return {success: true};
    } catch (err) {
        console.log(`Error on adding items to ${userData.userId} user's cart: ${err}`);
        return {success: false, error: "Internal error."};
    }

}

module.exports = cartAddRepository;