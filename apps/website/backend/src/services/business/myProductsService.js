const myProductsRepo = require('../../repositories/business/myProductRepo');
const upToCloudinary = require('../../utils/business/upToCloudinary');

const myProductsService = (userId) => {
    const repo = myProductsRepo(userId);

    const getMyProducts = async (userType) => {
        if (userType !== 'business') {
            return { code: 403, error: 'Forbidden: Only sellers can get products' };
        }
        
        return await repo.getMyProducts();
    };

    const addProduct = async (productData, imageFiles, userType) => {
        if (userType !== 'business') {
            return { code: 403, error: 'Forbidden: Only sellers can add products' };
        }

        if (!imageFiles || imageFiles.length === 0) {
            const error = new Error('Almeno una immagine è richiesta');
            error.statusCode = 400;
            throw error;
        }

        const imagesUrl = [];

        for (const image of imageFiles) {
            const result = await upToCloudinary(image.buffer);
            imagesUrl.push(result.secure_url);
        }

        const imageData = imagesUrl.map((url, index) => ({
            image_url: url,
            display_order: index + 1,
            is_primary: index === 0
        }));

        return await repo.addProduct(productData, imageData);
    };

    const updateProduct = async (productId, productData, userType) => {
        if (userType !== 'business') {
            return { code: 403, error: 'Forbidden: Only sellers can update products' };
        }

        return await repo.updateProduct(productId, productData);
    };

    const deleteProduct = async (productId, userType) => {
        if (userType !== 'business') {
            return { code: 403, error: 'Forbidden: Only sellers can delete products' };
        }
        
        return await repo.deleteProduct(productId);
    };

    return {
        getMyProducts,
        addProduct,
        updateProduct,
        deleteProduct
    };
}

module.exports = myProductsService;