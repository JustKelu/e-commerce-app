const pool = require('../../utils/database');

const myProductsRepo = () => {
    const getProduct = async (productId) => {
        try {
            const query = `
                SELECT 
                    p.*,
                    COALESCE(
                        JSON_AGG(
                            pi.image_url ORDER BY pi.display_order
                        ) FILTER (WHERE pi.image_url IS NOT NULL), 
                        '[]'::json
                    ) as images
                FROM products p
                LEFT JOIN product_images pi ON p.id = pi.product_id
                WHERE p.id = $1
                GROUP BY p.id
            `;

            const data = await pool.query(query, [productId]);

            return data.rows[0];
        } catch (err) {
            console.log(err);
            throw err;
        }        
    }
    
    const getProducts = async () => {
        try {
            const query = `
                SELECT 
                    p.id, p.name, p.description, p.price, p.stock_quantity, 
                    p.category, p.brand, p.created_at, pi.image_url
                FROM products p
                LEFT JOIN product_images pi ON p.id = pi.product_id AND pi.is_primary = true
                WHERE p.is_active = true
                ORDER BY RANDOM() 
                LIMIT 10
            `;

            const data = await pool.query(query);

            return data.rows;
        } catch (err) {
            console.log(err);
            throw err;
        }        
    }

    const searchProducts = async (searchParams) => {
        try {
            const query = `
                SELECT 
                    p.id, p.name, p.description, p.price, p.stock_quantity, 
                    p.category, p.brand, p.created_at, pi.image_url, 
                    ts_rank(search_vector, to_tsquery('italian', $1)) AS relevance 
                FROM products p
                LEFT JOIN product_images pi ON p.id = pi.product_id AND pi.is_primary = true
                WHERE search_vector @@ to_tsquery('italian', $1) AND p.is_active = true 
                ORDER BY relevance DESC 
                LIMIT 20
            `;

            const data = await pool.query(query, [searchParams]);

            return data.rows;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    return {
        getProduct,
        getProducts,
        searchProducts    
    }
}

module.exports = myProductsRepo();