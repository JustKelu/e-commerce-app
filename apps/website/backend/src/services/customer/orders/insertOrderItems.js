/**
 * @param {object} client - pg client instance
 * @param {Array} cartItems - array of cart items to insert as order items
 * @param {number} orderId - the order ID to associate with the items
 */

module.exports = async function insertOrderItems(client, cartItems, orderId) {
    let paramIndex = 1;

    let orderItemsQuery = "INSERT INTO order_items (order_id, product_id, seller_id, quantity, price, status) VALUES ";
    const orderItemsValues = [];

    cartItems.forEach((item, i) => {
        orderItemsQuery += `($${paramIndex}, $${paramIndex + 1}, $${paramIndex + 2}, $${paramIndex + 3}, $${paramIndex + 4}, 'pending')`;
        orderItemsValues.push(orderId, item.id, item.seller_id, item.quantity, item.price);
        paramIndex += 5;
        if (i < cartItems.length - 1) orderItemsQuery += ", ";
    });

    await client.query(orderItemsQuery, orderItemsValues);
};