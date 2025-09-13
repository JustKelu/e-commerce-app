const myProductsService = require("../services/myProductsService");

const getMyProducts = async (req, res, next) => {
    try {
        const service = myProductsService(req.userId);
        const products = await service.getMyProducts(req.userType);

        if (products.error) {
            return res.status(products.code).json({error: products.error});
        }

        res.status(200).json(products);
    } catch (err) {
        console.error("Error fetching user's products:", err);
        next(err);
    }
}

const addMyProduct = async (req, res, next) => {
    try {
        const service = myProductsService(req.userId);
        const newProduct = await service.addProduct(req.body, req.userType);

        if (newProduct.error) {
            return res.status(newProduct.code).json({error: newProduct.error});
        }
        
        res.status(201).json(newProduct);
    } catch (err) {
        console.error("Error adding product:", err);
        next(err);
    }
}

const updateMyProduct = async (req, res, next) => {
    try {
        const service = myProductsService(req.userId);
        const updatedProduct = await service.updateProduct(req.params.id, req.body, req.userType);

        if (updatedProduct.error) {
            return res.status(updatedProduct.code).json({error: updatedProduct.error});
        }

        res.status(200).json(updatedProduct);
    } catch (err) {
        console.error("Error updating product:", err);
        next(err);
    }
}

const deleteMyProduct = async (req, res, next) => {
    try {
        const service = myProductsService(req.userId); 
        const deleted = await service.deleteProduct(req.params.id, req.userType);

        if (deleted.error) {
            return res.status(deleted.code).json({error: deleted.error});
        }

        res.status(204).send();
    } catch (err) {
        console.error("Error deleting product:", err);
        next(err);
    }
}

module.exports = {
    getMyProducts,
    addMyProduct,
    updateMyProduct,
    deleteMyProduct,
};