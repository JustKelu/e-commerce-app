/**
 * @param {object} client - pg client instance
 * @param {number} amount - total amount of money to debit to the customer
 * @param {number} userId - customer's userId
 * @returns {Promise<any>}
 */

module.exports = async function debitUserBalance(client, amount, userId) {
    const debitQuery = `UPDATE users SET balance = balance - $1::NUMERIC WHERE id = $2 AND balance >= $1::NUMERIC`;
    const debitParams = [amount, userId];

    const result = await client.query(debitQuery, debitParams);
    return result;
};