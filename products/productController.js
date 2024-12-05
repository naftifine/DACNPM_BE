const productService = require('./productService');

const productController = {
    getAllProducts: async (req, res) => {
        try {
            const products = await productService.getAllProducts();
            res.status(200).json(products);
        } catch (err) {
            res.status(500).send('Error fetching products');
        }
    },

    getProductsByCategory: async (req, res) => {
        const { categoryID } = req.params;
        try {
            const products = await productService.getProductsByCategory(categoryID);
            res.status(200).json(products);
        } catch (err) {
            res.status(500).send('Error fetching products by category');
        }
    },

    addProduct: async (req, res) => {
        const { productName, categoryID } = req.body;
        try {
            const productID = await productService.addProduct(productName, categoryID);
            res.status(201).json({ message: 'Product created', productID });
        } catch (err) {
            res.status(500).send('Error adding product');
        }
    },

    deleteProduct: async (req, res) => {
        const { productID } = req.params;
        try {
            await productService.deleteProduct(productID);
            res.status(200).json({ message: 'Product deleted' });
        } catch (err) {
            res.status(500).send(err.message || 'Error deleting product');
        }
    },
};

module.exports = productController;