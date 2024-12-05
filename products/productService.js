const productModel = require('./productModel');

const productService = {
    getAllProducts: async () => {
        return await productModel.getAllProducts();
    },

    getProductsByCategory: async (categoryID) => {
        return await productModel.getProductsByCategory(categoryID);
    },

    addProduct: async (productName, categoryID) => {
        return await productModel.addProduct(productName, categoryID);
    },

    deleteProduct: async (productID) => {
        const rowsAffected = await productModel.deleteProduct(productID);
        if (rowsAffected === 0) {
            throw new Error('Product not found');
        }
        return true;
    },
};

module.exports = productService;
