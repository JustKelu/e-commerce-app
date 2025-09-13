/**
 * @param {object} client - pg client instance
 * @param {number} amount - total amount of money to debit to the customer
 * @param {number} userId - customer's userId
 * @returns {Promise<any>}
 */

module.exports = async function notifySellers(client, cartItems) {
    let notificationsQuery = "INSERT INTO notifications (seller_id, message) VALUES ";
    const notificationsValue = [];
    let paramIndex = 1;

    cartItems.forEach((item, i) => {
        notificationsQuery += `($${paramIndex}, $${paramIndex + 1})`;
        notificationsValue.push(item.seller_id, `Hai venduto ${item.quantity} unità di ${item.name}.`);

        paramIndex += 2;

        if (i < cartItems.length - 1) notificationsQuery += ", ";
    });

    const result = await client.query(notificationsQuery, notificationsValue);
    return result;
};