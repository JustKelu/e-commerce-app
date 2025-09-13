const pool = require('../utils/database');

const myProductsRepo = (userId) => {
    const getMyProducts = async () => {
        try {
            const product = await pool.query(
                `
                    SELECT id, name, description, price, stock_quantity, image_url, is_active, category 
                    FROM products WHERE seller_id = $1
                `, 
                [userId]
            );
            return product.rows;
        } catch (error) {
            console.error('Error fetching products:', error);
            return {error: 'Error fetching products'};
        }   
    };
    const addProduct = async (productData) => {
        const { name, description, price, image_url } = productData;
        try {
            const result = await pool.query(
                'INSERT INTO products (seller_id, name, description, price, image_url) VALUES ($1, $2, $3, $4, $5) RETURNING id',
                [userId, name, description, price, image_url]
            );
            return { id: result.rows[0].id, ...productData };
        } catch (error) {
            console.error('Error adding product:', error);
            return {error: 'Error adding product'};
        }
    }
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