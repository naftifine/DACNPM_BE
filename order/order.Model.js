const { db } = require('../db');
const sql = require('mssql');


exports.getOrder = async (orderID) => {
    const pool = await db();
    try {
        const query = `SELECT * FROM Order WHERE id = @orderID'`;
        const result = await pool.request()
        .input('orderID', sql.Int, orderID)
        .query(query);
        return result.recordset;
    }catch (err) {
        console.error('Không thể lấy thông tin của đơn hàng!', err);
    }
};

exports.addOrder = async (data) => {
    const pool = await db();
    const query = `
        INSERT INTO Products (productid, userid, quantity, totalprice, shippingfee, shippingAddress, buyerNote)
        VALUES (@productid, @userid, @quantity, @totalprice, @shippingfee, @shippingAddress, @buyerNote);
        SELECT SCOPE_IDENTITY() AS OrderID;
    `;
    const result = await pool
        .request()
        .input('productid', sql.Int, data.productid)
        .input('userid', sql.Int, data.userid)
        .input('quantity', sql.Int, data.quantity)
        .input('totalprice', sql.Int, data.totalprice)
        .input('shippingfee', sql.Int, data.shippingfee)
        .input('shippingAddress', sql.NVarChar, data.shippingAddress)
        .input('buyerNote', sql.NVarChar, data.buyerNote)
        .query(query);
    return result.recordset[0].OrderID;
};


exports.updateOrder = async (OrderID, data) => {
    const pool = await db();
    try {
        const query = `
            UPDATE Produts 
            SET productid = @productid, 
            quantity = @quantity, 
            totalprice = @totalprice, 
            shippingfee = @shippingfee, 
            shippingAddress = @shippingAddress, 
            buyerNote = @buyerNote
            WHERE id = @OrderID;
        `;
        const result = await pool 
            .request()
            .input('productid', sql.Int, data.productid)
            .input('quantity', sql.Int, data.quantity)
            .input('totalprice', sql.Int, data.totalprice)
            .input('shippingfee', sql.Int, data.shippingfee)
            .input('shippingAddress', sql.NVarChar, data.shippingAddress)
            .input('buyerNote', sql.NVarChar, data.buyerNote)
            .query(query);
        return result.rowsAffected;
    }catch (err) {
        console.error('Không thể update đơn hàng vào hệ thống', err)
    }
};

exports.deleteOrder = async (orderID) => {
    const pool = await db();
    try {
        const query = `DELETE FROM Order 
            WHERE id = @orderID;
        `;
        const result = await pool
            .request()
            .input('orderID', orderID)
            .query(query);
        return result.rowsAffected[0];
    }catch (err) {
        console.error('Không thể xóa đơn hàng trong hệ thống', err);
    }
};

exports.checkOrderExists = async (OrderId) => {
    const pool = await db() // Kết nối từ file cấu hình
    try {
        const query = `SELECT COUNT(*) AS count FROM Order WHERE id = @OrderID`;
        const result = await pool.request()
            .input('OrderID', sql.Int, OrderId)
            .query(query);
        return result.recordset[0].count > 0; // Trả về true nếu tồn tại
    }catch (err) {
        console.error('Không thể kiểm tra đơn hàng có tồn tại trong hệ thống', err);
    }
};

