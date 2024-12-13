const productModel = require('./productModel');


exports.getAllProducts = async () => {
    return await productModel.getAllProducts();
};
exports.search = async (name) => {
    const data =  await productModel.getAllProducts(name);
    const results = data.filter((product) =>
        product.name.toLowerCase().includes(keyword.toLowerCase())
    );
    return results;
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

