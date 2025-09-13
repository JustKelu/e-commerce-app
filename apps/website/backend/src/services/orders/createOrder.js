/**
 * @param {object} client - pg client instance
 * @param {number} amount - total amount of money to debit to the customer
 * @param {number} userId - customer's userId
 * @returns {Promise<any>}
 */

module.exports = async function createOrder(client, checkoutTotal, userId) {
    const orderQuery = `
        INSERT INTO orders (user_id, total_amount, status, created_at)
        VALUES ($1, $2, 'pending', NOW())
        RETURNING id;
    `;
    const orderValues = [userId, checkoutTotal];

    const result = await client.query(orderQuery, orderValues);
    return result;
};