 const productService = require('./productService');

exports.getAllProducts = async (req, res) => {
    try {
        const products = await productService.getAllProducts();
        const message = {
            "success" : true,
            "message" : "Lấy dữ liệu của tất cả sản phẩm thành công",
            "data" : products
        }
        res.status(200).json(message);
    } catch (err) {
        const message = {
            "success" : false,
            "message" : "Lấy dữ liệu của tất cả sản phẩm không thành công",
            "data" : null
        }
        res.status(500).json(message);
    }
};
exports.searchProduct = async(req, res) => {
    
}
exports.addProduct = async (req, res) => {
    const data = req.body.data;
    try {
        const productID = await productService.addProduct(data);
        data.productID = productID;
        const message = {
            "success" : true,
            "message" : "Thêm sản phẩm " + data.PName + " thành công!",
            "data" : data
        }
        res.status(201).json(message);
    } catch (err) {
        const message = {
            "success" : false,
            "message" : "Lỗi khi thêm sản phẩm " + data.PName + " vào hệ thống!",
            "data" :  null
        }
        res.status(500).json(message);
    }
};
exports.updateProduct = async (req, res) => {
    const ProductID = req.params.id;
    const updateData = req.body.data;
    try {
        const updateProduct = await productService.updateProduct(ProductID, updateData);
        if(!updateProduct) {
            const message = {
                "success" : false,
                "message" : "Lỗi không tìm thấy sản phẩm " + updateData.PName + " trong hệ thống!",
                "data" : null
            }
            return res.status(404).json(message);
        }
        const message = {
            "success" : true,
            "message" : "Cập nhật thành công sản phẩm " + updateData.PName + " trong hệ thống!",
            "data" : updateData
        }
        res.status(200).json(message);
    } catch (err) {
        const message = {
            "success" : false,
            "message" : "Lỗi lấy dữ liệu từ hệ thống không thành công!",
            "data" : null
        }
        res.status(500).json(message);
    }
}
exports.deleteProduct = async (req, res) => {
    const productID = req.params.id;
    try {
        const deleteProduct = await productService.deleteProduct(productID);
        if(!deleteProduct) {
            const message = {
                "success" : false,
                "message" : "Lỗi không tìm thấy sản phẩm trong hệ thống!",
                "data" : null
            }
            res.status(404).json(message);
        }
        const message = {
            "success" : true,
            "message" : "Xóa sản phẩm thành công!",
            "data" : null
        }
        res.status(200).json(message);
    } catch (err) {
        const message = {
            "success" : false,
            "message" : "Lỗi xóa sản phẩm không thành công!",
            "data" : null
        }
        res.status(500).json(message);
    }
};

