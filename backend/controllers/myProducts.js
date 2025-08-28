const myProductsService = require("../services/myProductsService");

const getMyProducts = async (req, res) => {
    try {
        const userId = req.userId; 
        const service = myProductsService(userId);
        const products = await service.getMyProducts();
        res.status(200).json(products);
    } catch (error) {
        console.error("Error fetching user's products:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const addMyProduct = async (req, res) => {
    try {
        const userType = req.userType;
        if (userType !== 'business') return res.status(403).json({ error: 'Forbidden: Only sellers can add products' });
        
        const userId = req.userId; 
        const productData = req.body;
        const service = myProductsService(userId);
        const newProduct = await service.addProduct(productData);
        res.status(201).json(newProduct);
    } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const updateMyProduct = async (req, res) => {
    try {
        const userId = req.userId; 
        const productId = req.params.id; // Ricorda di controllare che l'ID sia intestato all'utente 
        const productData = req.body;
        const service = myProductsService(userId);
        const updatedProduct = await service.updateProduct(productId, productData);
        if (updatedProduct.error) {
            return res.status(404).json({ error: updatedProduct.error });
        }
        res.status(200).json(updatedProduct);
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const deleteMyProduct = async (req, res) => {
    try {
        const userId = req.userId; 
        const productId = req.params.id; // Ricorda di controllare che l'ID sia intestato all'utente
        const service = myProductsService(userId); 
        const deleted = await service.deleteProduct(productId);
        if (deleted.error) {
            return res.status(404).json({ error: deleted.error });
        }
        res.status(204).send();
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    getMyProducts,
    addMyProduct,
    updateMyProduct,
    deleteMyProduct,
};