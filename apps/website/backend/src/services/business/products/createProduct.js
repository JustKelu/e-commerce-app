const createProduct = async (client, userId, productData) => {
    const productQuery = `
        INSERT INTO products (seller_id, name, description, price, stock_quantity, category, brand)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *
    `;
    const productResult = await client.query(productQuery, [
        userId, productData.name, productData.description,
        productData.price, productData.stock_quantity, productData.category,
        productData.brand
    ]);

    return productResult.rows[0];
}

module.exports = createProduct;