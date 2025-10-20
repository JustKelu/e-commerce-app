const myProductsService = require('../../services/customer/myProductsService');

const getProduct = async (req, res, next) => {
    try {
        const product = await myProductsService.getProduct(req.params.id);
        res.status(200).json({product});
    } catch (err) {
        next(err)
    }
}

const getProducts = async (req, res, next) => {
    if (req.query.search) {
        try {
            const products = await myProductsService.searchProducts(req.query.search);
            res.json(products);
        } catch (err) {
            next(err);
        }
    } else {
        try {
            const products = await myProductsService.getProducts();
            res.json(products);
        } catch (err) {
            next(err);
        }
    }
}

module.exports = {
    getProduct,
    getProducts
}