const productsService = require('../../services/products/productsService')

const getProduct = async (req, res, next) => {
    try{
        const service = productsService(req.adminType);
        const response = await service.getProduct(req.params.id);

        res.json({success: true, result: response});
    } catch (err) {
        next(err);
    }
}

const approveProduct = async (req, res, next) => {
    try{
        const service = productsService(req.adminType);
        const response = await service.approveProduct(req.params.id);

        res.json({success: true, result: response});
    } catch (err) {
        next(err);
    }
}

const deleteProduct = async (req, res, next) => {
    try{
        const service = productsService(req.adminType);
        const response = await service.deleteProduct(req.params.id);

        res.json({success: true, result: response});
    } catch (err) {
        next(err);
    }
}

const products = async (req, res, next) => {
    try{
        const service = productsService(req.adminType);
        const response = await service.getProducts();

        res.json({success: true, result: response});
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getProduct,
    approveProduct,
    deleteProduct,
    products,
};