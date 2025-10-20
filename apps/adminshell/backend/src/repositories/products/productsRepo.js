const pool = require('../../utils/database');
const deleteFromCloudinary = require('../../utils/deleteFromCloudinary');

const getProductRepo = async (productId) => {
    const query = `
        SELECT 
        p.id, p.name, p.stock_quantity, p.brand, 
        p.description, p.price, 
        COALESCE(
            JSON_AGG(
                pi.image_url ORDER BY pi.display_order
            ) FILTER (WHERE pi.image_url IS NOT NULL), 
        '[]'::json
        ) as images
        FROM products p
        LEFT JOIN product_images pi ON p.id = pi.product_id  
        WHERE p.id = $1
        GROUP BY 
            p.id, p.name, p.stock_quantity, p.brand, 
            p.description, p.price
        `;
            
    try {
        const result = await pool.query(query, [productId]);
        return result.rows[0];
    } catch (err) {
        console.log(err);
        throw new Error('Impossibile ottenere i prodotti');
    }
}
        
const approveProductRepo = async (productId) => {
    try {
        const result = await pool.query('UPDATE products SET is_active = true WHERE id = $1', [productId]);
        return result.rows;
    } catch (err) {
        console.log(err);
        throw new Error('Impossibile approvare il prodotto');
    }
}

const deleteProductRepo = async (productId) => {
    const query = ` 
        WITH deleted_images AS (
            DELETE FROM product_images 
            WHERE product_id = $1
            RETURNING image_url
        ),
        deleted_product AS (
            DELETE FROM products 
            WHERE id = $1
            RETURNING id
        )
        SELECT COALESCE(ARRAY_AGG(image_url), '{}') AS image_urls
        FROM deleted_images;
    `

    try {
        const result = await pool.query(query, [productId]);
        
        // Correzione: controlla se ci sono risultati e se l'array non è vuoto
        if (result.rows.length === 0 || result.rows[0].image_urls.length === 0) {
            throw new Error('Prodotto non trovato');
        }

        const imageUrls = result.rows[0].image_urls;
        await deleteFromCloudinary(imageUrls);
        
        return result.rows[0];
        
    } catch (error) {
        console.error('Errore nella cancellazione:', error);
        throw error;
    }
};

const getProductsRepo = async () => {
    const query = `
            SELECT 
                p.id, p.name, p.description, p.price, p.stock_quantity, p.brand, p.category,
                pi.image_url, u.name AS seller_name, u.id AS seller_id 
            FROM products p
            LEFT JOIN product_images pi ON p.id = pi.product_id AND pi.is_primary = true  
            LEFT JOIN users u ON p.seller_id = u.id  
            WHERE p.is_active = false 
            ORDER BY p.id 
            LIMIT 5
        `;

    try {
        const result = await pool.query(query);
        return result.rows;
    } catch (err) {
        console.log(err);
        throw new Error('Impossibile ottenere il prodotto');
    }
}
        
module.exports = {
    getProductRepo,
    approveProductRepo,
    deleteProductRepo,
    getProductsRepo,
}