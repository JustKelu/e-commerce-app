/**
 * @param {object} client - pg client instance
 * @param {Array} cartItems - array of cart items to subtract from stock_quantity
 */

module.exports = async function subtractOrderItems(client, cartItems) {
    let paramIndex = 1;

    let subtractQuery = "UPDATE products SET stock_quantity = stock_quantity - CASE ";
    let whereClause = "WHERE id IN (";
    const subtractValues = [];


    cartItems.forEach((item, i) => {
        subtractQuery += `WHEN id = $${paramIndex} THEN $${paramIndex + 1}::NUMERIC `;
        whereClause += `$${paramIndex}`;

        subtractValues.push(item.id, item.quantity);
        paramIndex += 2;
        
        if (i < cartItems.length - 1) {
            whereClause += ", ";
        };
    });

    subtractQuery += "ELSE 0 END " + whereClause + ")";

    await client.query(subtractQuery, subtractValues);
}