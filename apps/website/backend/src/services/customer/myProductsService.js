const myProductsRepo = require('../../repositories/customer/myProductsRepo')    

const myProductsService = () => {

    const getProduct = async (productId) => {
        try {
            const product = await myProductsRepo.getProduct(productId);

            return product;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    const getProducts = async () => {
        try {
            const products = await myProductsRepo.getProducts();

            return products;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    const searchProducts = async (searchParams) => {
        try {
            searchParams = searchParams.replace(/ /g, ' | ');
            const products = await myProductsRepo.searchProducts(searchParams);
            
            return products;
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

module.exports = myProductsService();    