const insertImage = async (client, productId, imageData) => {
    for (const image of imageData) {
        const imageQuery = `
            INSERT INTO product_images (product_id, image_url, display_order, is_primary)
            VALUES ($1, $2, $3, $4)
        `;
        await client.query(imageQuery, [
            productId, image.image_url, image.display_order, image.is_primary
        ]);
    }
};

module.exports = insertImage;