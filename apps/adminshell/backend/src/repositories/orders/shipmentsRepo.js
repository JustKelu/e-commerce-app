const pool = require('../../utils/database');

const getShipmentsRepo = async () => {
    const query = `
        SELECT 
            o.id, 
            o.total_amount AS total, 
            o.status,
            json_agg(
                json_build_object(
                    'product_id', p.id,
                    'name', p.name,
                    'qty', oi.quantity,
                    'image_url', pi.image_url
                )
            ) AS products
        FROM orders o
        LEFT JOIN order_items oi ON o.id = oi.order_id
        LEFT JOIN products p ON oi.product_id = p.id 
        LEFT JOIN product_images pi ON p.id = pi.product_id AND pi.is_primary = true
        WHERE o.status = 'processing'
        GROUP BY o.id, o.status, o.total_amount 
    `

    const data = await pool.query(query);

    return data.rows;
}

const confirmShipmentsRepo = async (orderId, trackingNumber) => {
    const query = `
        WITH update_orders AS (
            UPDATE orders 
            SET status = 'shipped'
            WHERE id = $1 AND status = 'processing'
            RETURNING id
        ) 
        UPDATE shipments 
        SET tracking_number = $2, 
            shipped_at = NOW(),
            status = 'shipped'
        FROM update_orders
        WHERE shipments.order_id = update_orders.id
        RETURNING shipments.*
    `;

    const values = [
        orderId,
        trackingNumber
    ]

    try {
        const response = await pool.query(query, values);
        if (response.rows.length === 0) throw new Error('Ordine non trovato');

        return "Spedizione creata con successo"
    } catch (err) {
        console.log(err);
        throw new Error('Errore nel creare la spedizione');
    }
}

module.exports = { 
    getShipmentsRepo,
    confirmShipmentsRepo,
};