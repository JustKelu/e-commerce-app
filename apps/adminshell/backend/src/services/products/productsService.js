const { getProductRepo, approveProductRepo, deleteProductRepo, getProductsRepo } = require('../../repositories/products/productsRepo');

const productsService = (adminType) => {
    if (adminType !== 'base' && adminType !== 'super') throw new Error('Solo gli admin posso accedere a questa rotta.');

    const getProduct = async (productId) => {
        try {
            const response = await getProductRepo(productId);
            if (response.length === 0) throw new Error('Prodotto non trovato');

            return response;
        } catch (err) {
            console.log(err);
            throw new Error('Impossibile ottenere il prodotto');
        }
    }

    const approveProduct = async (productId) => {
        try {
            const response = await approveProductRepo(productId);

            return response;
        } catch (err) {
            console.log(err);
            throw new Error('Impossibile approvare il prodotto');
        }
    }

    const deleteProduct = async (productId) => {
        try {
            const response = await deleteProductRepo(productId);

            return response;
        } catch (err) {
            console.log(err);
            throw new Error('Impossibile eliminare il prodotto');
        }
    }

    const getProducts = async () => {
        try {
            const response = await getProductsRepo();
            
            return response;
        } catch (err) {
            console.log(err);
            throw new Error('Impossibile ottenere i prodotti');
        }
    }

    return {
        getProduct,
        approveProduct,
        deleteProduct,
        getProducts,
    }
}

module.exports = productsService;