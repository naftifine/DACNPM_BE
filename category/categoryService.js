const categoryModel = require('./categoryModel');

exports.getListCategory = async () => {
    return await categoryModel.getListCategory();
}

exports.getProductbyCategory = async(categoryID) => {
    if(!categoryModel.checkCategoryExists(categoryID)) {return null;}
    return await categoryModel.getProductbyCategory(categoryID);
}

exports.insertCategory = async(data) => {
    return await categoryModel.insertCategory(data);
}

exports.updateCategory = async(categoryID) => {
    if(!categoryModel.checkCategoryExists(categoryID)) {return null;}
    return await categoryModel.updateCategory(categoryID, data);
} 

exports.deleteCategory = async(categoryID) => {
    if(!categoryModel.checkCategoryExists(categoryID)) {return null;}
    return await categoryModel.deleteCategory(categoryID);
}