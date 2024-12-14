const orderService = require('./orderService');

exports.getOrder = async (req, res) => {
    const orderid = req.params.id
    try {
        const order = await orderService.getOrder(orderid);
        if(!order) {
            res.status(404).json({
                "success" : false,
                "message" : "Required order don't find!"
            })
        }
        const message = {
            "success" : true,
            "message" : "Lấy dữ liệu của đơn hàng thành công",
            "data" : order
        }
        res.status(200).json(message);
    } catch (err) {
        const message = {
            "success" : false,
            "message" : "Lấy dữ liệu của đơn hàng không thành công",
            "data" : null
        }
        res.status(500).json(message);
    }
};

exports.addOrder = async (req, res) => {
    const data = req.body.data;
    try {                             
        const orderID = await orderService.addOrder(data);
        data.orderID = orderID;
        const message = {
            "success" : true,
            "message" : "Thêm đơn hàng thành công!",
            "data" : data
        }
        res.status(201).json(message);
    } catch (err) {
        const message = {
            "success" : false,
            "message" : "Lỗi khi thêm đơn hàng vào hệ thống!",
            "data" :  null
        }
        res.status(500).json(message);
    }
};
exports.updateOrder = async (req, res) => {
    const orderID = req.params.id;
    const updateData = req.body.data;
    try {
        const updateOrder = await orderService.updateOrder(orderID, updateData);
        if(!updateOrder) {
            const message = {
                "success" : false,
                "message" : "Lỗi không tìm thấy đơn hàng trong hệ thống!",
                "data" : null
            }
            return res.status(404).json(message);
        }
        const message = {
            "success" : true,
            "message" : "Cập nhật thành công đơn hàng trong hệ thống!",
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
exports.deleteOrder = async (req, res) => {
    const orderID = req.params.id;
    try {
        const deleteOrder = await orderService.deleteOrder(orderID);
        if(!deleteOrder) {
            const message = {
                "success" : false,
                "message" : "Lỗi không tìm thấy đơn hàng trong hệ thống!",
                "data" : null
            }
            res.status(404).json(message);
        }
        const message = {
            "success" : true,
            "message" : "Xóa đơn hàng thành công!",
            "data" : null
        }
        res.status(200).json(message);
    } catch (err) {
        const message = {
            "success" : false,
            "message" : "Lỗi xóa đơn hàng không thành công!",
            "data" : null
        }
        res.status(500).json(message);
    }
};

