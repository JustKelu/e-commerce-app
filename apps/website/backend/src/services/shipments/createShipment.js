/**
 * @param {object} client - pg client instance
 * @param {number} shipmentData - all data to ship the order to the customer
 * @param {number} orderId 
 * @returns {Promise<any>}
 */

module.exports = async function createOrder(client, shipmentData, orderId) {
    const shipmentQuery = `
        INSERT INTO shipments 
        (order_id, full_name, street_address, city, province, postal_code, phone_number, notes)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        `;
    const shipmentValues = [
        orderId,
        `${shipmentData.name} ${shipmentData.surname}`,
        `${shipmentData.address_street} ${shipmentData.address_number}`,
        shipmentData.address_city,
        shipmentData.province,
        shipmentData.address_zip,
        shipmentData.phone_number,
        shipmentData.notes,
    ];

    const result = await client.query(shipmentQuery, shipmentValues)
    return result;
};