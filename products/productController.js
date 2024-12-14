 const { getProductByUser_Id } = require('./productModel');
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
exports.search = async(req, res) => {
    const name = req.query.name;
    try {
        const products = await productService.search(name);
        if (products) {            
            const message = {
                "success" : true,
                "message" : "Tìm thấy sản phẩm yêu cầu",
                "data" : products
            }
            res.status(200).json(message);
        }   
        else
        {const message = {
            "success" : false,
            "message" : "Không tìm thấy sản phẩm theo yêu cầu",
            "data" : null
        }
        res.status(404).json(message)}
        
    } catch (err) {
        const message = {
            "success" : false,
            "message" : "Lấy dữ liệu của sản phẩm yêu cầu không thành công",
            "data" : null
        }
        res.status(500).json(message);
    }
}
exports.addProduct = async (req, res) => {
    const data = req.body;
    console.log(req.body);
    try {                             
        const product = await productService.addProduct(data);
        console.log(product);
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

exports.getProductById = async (req, res) => {
    try {
        const productId  = req.query.productid;  // Lấy productId từ query params

        if (!productId) {
            return res.status(400).json({
                success: false,
                message: "productId is required",
            });
        }

        // Gọi service để lấy chi tiết sản phẩm
        const product = await productService.getProductById(productId);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Product details fetched successfully",
            data: product,
        });
    } catch (err) {
        console.error('Error in detail controller:', err);
        res.status(500).json({
            success: false,
            message: "Error fetching product details",
            data: null,
        });
    }
};

exports.getProductByUserid = async (req, res) => {
    try {
        const userid  = req.query.userid;  

        if (!userid) {
            return res.status(400).json({
                success: false,
                message: "productId is required",
            });
        }

        // Gọi service để lấy chi tiết sản phẩm
        const product = await productService.getProductByUserId(userid);
        
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Product details fetched successfully",
            data: product,
        });
    } catch (err) {
        console.error('Error in detail controller:', err);
        res.status(500).json({
            success: false,
            message: "Error fetching product details",
            data: null,
        });
    }
};
