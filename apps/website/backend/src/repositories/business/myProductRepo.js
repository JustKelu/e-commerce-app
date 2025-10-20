const pool = require('../../utils/database');
const products = require('../../services/business/products');

const myProductsRepo = (userId) => {
    const getMyProducts = async () => {
        try {
            const result = await pool.query(
                `
                    SELECT 
                        p.id, p.name, p.description, p.price, p.stock_quantity, 
                        p.is_active, p.category,
                        COALESCE(
                            JSON_AGG(
                                JSON_BUILD_OBJECT(
                                    'id', pi.id,
                                    'url', pi.image_url,
                                    'display_order', pi.display_order,
                                    'is_primary', pi.is_primary
                                ) ORDER BY pi.display_order
                            ) FILTER (WHERE pi.id IS NOT NULL), 
                            '[]'
                        ) as images
                    FROM products p
                    LEFT JOIN product_images pi ON p.id = pi.product_id
                    WHERE p.seller_id = $1
                    GROUP BY p.id, p.name, p.description, p.price, p.stock_quantity, p.is_active, p.category
                `, 
                [userId]
            );
            return result.rows;
        } catch (error) {
            console.error('Error fetching products:', error);
            return {error: 'Error fetching products'};
        }   
    };

    const addProduct = async (productData, imageData) => {
        const client = await pool.connect();
    
        try {
            await client.query('BEGIN');
            
            const product = await products.createProduct(client, userId, productData);
            await products.insertImage(client, product.id, imageData);
            
            await client.query('COMMIT');
            return product;
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    };
    const updateProduct = async (productId, productData) => {
        const { name, description, price } = productData;
        try {
            const result = await pool.query(
                'UPDATE products SET name = $1, description = $2, price = $3 WHERE id = $4 AND seller_id = $5 RETURNING id',
                [name, description, price, productId, userId]
            );
            if (result.rowCount === 0) {
                return { error: 'Product not found or no changes made' };
            }
            return { id: result.rows[0].id, ...productData };
        } catch (error) {
            console.error('Error updating product:', error);
            return {error: 'Error updating product'};
        }
    }
    const deleteProduct = async (productId) => {
        try {
            const result = await pool.query(
                'DELETE FROM products WHERE id = $1 AND seller_id = $2 RETURNING id',
                [productId, userId]
            );
            if (result.rowCount === 0) {
                return { error: 'Product not found' };
            }
            return { message: 'Product deleted successfully' };
        } catch (error) {
            console.error('Error deleting product:', error);
            return {error: 'Error deleting product'};
        }
    }
    return {
        getMyProducts,
        addProduct,
        updateProduct,
        deleteProduct
    };
}
module.exports = myProductsRepo;