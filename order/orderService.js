const orderModel = require('./orderModel');

exports.getOrder = async (orderID) => {
    return await orderModel.getOrder(orderID);
};

exports.addOrder = async (data) => {
    return await orderModel.addOrder(data);
};
exports.updateOrder = async (OrderID, data) => {
    if(!orderModel.checkOrderExists(OrderID)) {return null;}
    return await orderModel.updateOrder(OrderID, data);
} 
exports.deleteOrder = async (OrderID) => {
    if(!orderModel.checkOrderExists(OrderID)) {return null;}
    return await orderModel.deleteOrder(OrderID);
};

