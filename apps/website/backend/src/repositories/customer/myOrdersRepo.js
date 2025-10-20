const pool = require('../../utils/database');

const myOrdersRepo = () => {
    const getOrders = async (userId) => {
        const query = `
            SELECT 
                o.id,
                o.total_amount,
                o.status as order_status,
                o.created_at,
                
                COALESCE(
                    JSON_AGG(
                        CASE 
                            WHEN p.id IS NOT NULL THEN
                                JSON_BUILD_OBJECT(
                                    'product_id', p.id,
                                    'name', p.name,
                                    'description', p.description,
                                    'image_url', pi.image_url,
                                    'price', p.price,
                                    'quantity', oi.quantity,
                                    'subtotal', (p.price * oi.quantity)
                                )
                            ELSE NULL
                        END
                    ) FILTER (WHERE p.id IS NOT NULL),
                    '[]'::json
                ) AS products,
                
                COALESCE(
                    JSON_AGG(
                        CASE 
                            WHEN s.id IS NOT NULL THEN
                                JSON_BUILD_OBJECT(
                                    'shipping_id', s.id,
                                    'address', s.street_address,
                                    'city', s.city,
                                    'postal_code', s.postal_code,
                                    'status', s.status,
                                    'tracking_number', s.tracking_number
                                )
                            ELSE NULL
                        END
                    ) FILTER (WHERE s.id IS NOT NULL),
                    '[]'::json
                ) AS shipping_addresses
                
            FROM orders o
            LEFT JOIN order_items oi ON o.id = oi.order_id
            LEFT JOIN products p ON oi.product_id = p.id
            LEFT JOIN shipments s ON o.id = s.order_id
            LEFT JOIN product_images pi ON p.id = pi.product_id AND pi.is_primary = true
            WHERE o.user_id = $1
            GROUP BY o.id, o.total_amount, o.status, o.created_at
            ORDER BY o.created_at DESC
    `;

        const values = [userId];

        const data = await pool.query(query, values);

        return data.rows;
    }

    return { getOrders };
}

module.exports = myOrdersRepo();