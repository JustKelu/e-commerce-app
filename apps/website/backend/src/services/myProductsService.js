const myProductsRepo = require('../repositories/myProductRepo');

const myProductsService = (userId) => {
    const repo = myProductsRepo(userId);

    const getMyProducts = async (userType) => {
        if (userType !== 'business') {
            return { code: 403, error: 'Forbidden: Only sellers can get products' };
        }
        
        return await repo.getMyProducts();
    };

    const addProduct = async (productData, userType) => {
        if (userType !== 'business') {
            return { code: 403, error: 'Forbidden: Only sellers can add products' };
        }

        return await repo.addProduct(productData);
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