const categoryService = require('./categoryService');

exports.getListCategory = async (req, res) => {
    try {
        const ListCategory = await categoryService.getListCategory();
        const message = {
            "success" : true,
            "message" : "Lấy danh mục hiện có trong hệ thống thành công!",
            "data" : ListCategory
        }
        res.status(200).json(message);
    }catch (err) {
        const message = {
            "success" : false,
            "message" : "Lấy danh mục hiện trong hệ thống không thành công!",
            "data" : null
        }
        res.status(500).json(message);
    }
}

exports.getProductbyCategory = async (req, res) => {
    const categoryID = req.params.id;
    try {
        const getByCate = await categoryService.getProductbyCategory(categoryID);
        if(!getByCate) {
            const message = {
                "success" : false,
                "message" : "Lỗi không tìm thấy danh mục trong hệ thống!",
                "data" : null
            }
            return res.status(404).json(message);
        }
        const message = {
            "success" : true,
            "message" : "Lấy sản phẩm trong danh mục thành công!",
            "data" : getByCate
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

exports.insertCategory = async (req, res) => {
    const data = req.body.data;
    try {
        const categoryID = await categoryService.insertCategory(data);
        data.CategoryID = categoryID;
        const message = {
            "success" : true,
            "message" : "Thêm danh mục " + data.CName + " thành công!",
            "data" : data
        }
        res.status(201).json(message);
    } catch (err) {
        const message = {
            "success" : false,
            "message" : "Lỗi khi thêm danh mục " + data.CName + " vào hệ thống!",
            "data" :  null
        }
        res.status(500).json(message);
    }
}

exports.updateCategory = async (req, res) => {
    const categoryID = req.params.id;
    const data = req.body.data;
    try {
        const updateData = await catepdateData(categoryID, data);
        if(!updateData)  {       
            const message = {
                "success" : false,
                "message" : "Lỗi không tìm thấy danh mục " + updateDCategory.CName + " trong hệ thống!",
                "data" : null
            }
            return res.status(404).json(message);
        }
        const message = {
            "success" : true,
            "message" : "Cập nhật danh mục " + data.CName + " thành công!",
            "data" : data
        }
        res.status(201).json(message);
    } catch (err) {
        const message = {
            "success" : false,
            "message" : "Lỗi khi cập nhật danh mục " + data.CName + " vào hệ thống!",
            "data" :  null
        }
        res.status(500).json(message);
    }
}

exports.deleteCategory = async (req, res) => {
    const categoryID = req.params.id;
    try {
        const deleteData = await categoryService.deleteCategory(categoryID);
        if(!deleteData) {
            const message = {
                "success" : false,
                "message" : "Lỗi không tìm thấy danh mục trong hệ thống!",
                "data" : null
            }
            return res.status(404).json(message);
        }
        const message = {
            "success" : true,
            "message" : "Xóa danh mục thành công!",
            "data" : data
        }
        res.status(201).json(message);
    } catch (err) {
        const message = {
            "success" : false,
            "message" : "Lỗi khi xóa danh mục trong hệ thống!",
            "data" :  null
        }
        res.status(500).json(message);
    }
}