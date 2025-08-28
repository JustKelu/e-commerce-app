const myProductsRepo = require('../repositories/myProductsRepo');

const myProductsService = (userId) => {
    const repo = myProductsRepo(userId);

    const getMyProducts = async () => {
        return await repo.getMyProducts();
    };

    const addProduct = async (productData) => {
        return await repo.addProduct(productData);
    };

    const updateProduct = async (productId, productData) => {
        return await repo.updateProduct(productId, productData);
    };

    const deleteProduct = async (productId) => {
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