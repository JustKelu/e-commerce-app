module.exports = async function creditSellers(client, customersTotals) {
    let creditQuery = "UPDATE users SET balance = balance + CASE ";
    let whereClause = "WHERE id IN (";
    let creditParams = [];
    let paramIndex = 1;

    customersTotals.forEach((seller, index) => {
        creditQuery += `WHEN id = $${paramIndex} THEN $${paramIndex + 1}::NUMERIC `;
        whereClause += `$${paramIndex}`;

        creditParams.push(seller.seller_id, seller.amount);
        paramIndex += 2;
        
        if (index < customersTotals.length - 1) {
            whereClause += ", ";
        }
    });

    creditQuery += "ELSE 0 END " + whereClause + ")";

    const result = await client.query(creditQuery, creditParams);
    return result;
};