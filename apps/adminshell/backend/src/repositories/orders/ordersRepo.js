const pool = require('../../utils/database');

const getProfitRepo = async () => {
    const data = await pool.query('SELECT balance FROM commission_account');

    return data.rows[0];
}

const getOrdersRepo = async () => {
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
        WHERE o.status = 'pending'
        GROUP BY o.id, o.status, o.total_amount 
    `;

    const data = await pool.query(query);

    return data.rows;
}

const confirmOrderRepo = async (orderId) => {
    try {
        const result = await pool.query(
            "UPDATE orders SET status = 'processing' WHERE id = $1", 
            [orderId]
        );

        if (result.rowCount === 0) {
            throw new Error("Ordine non trovato");
        }

        return "Ordine aggiornato"
    } catch (err) {
        console.log(err);
        throw new Error("Ordine non aggiornato correttamente.");
    }
}

module.exports = { 
    getProfitRepo, 
    getOrdersRepo,
    confirmOrderRepo, 
};