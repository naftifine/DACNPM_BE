const productModel = require('./productModel');


exports.getAllProducts = async () => {
    return await productModel.getAllProducts();
};
exports.getProductById = async (productId) => {
    return await productModel.getProductById(productId);
};

exports.getProductByUserId = async (userid) => {
    return await productModel.getProductByUserId(userid);
};

exports.search = async (name) => {
    return await productModel.searchByName(name);
}
exports.addProduct = async (data) => {
    return await productModel.addProduct(data);
};
exports.updateProduct = async (ProductID, data) => {
    if(!productModel.checkProductExists(ProductID)) {return null;}
    return await productModel.updateProduct(ProductID, data);
} 
exports.deleteProduct = async (productID) => {
    if(!productModel.checkProductExists(productID)) {return null;}
    return await productModel.deleteProduct(productID);
};

