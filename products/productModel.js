const { db } = require('../db');
const sql = require('mssql');


exports.getAllProducts = async () => {
    const pool = await db();
    try {
        const query = `SELECT * FROM Products WHERE status != 'Deleted'`;
        const result = await pool.request().query(query);
        return result.recordset;
    }catch (err) {
        console.error('Không thể lấy thông tin của tất cả sản phẩm!', err);
    }
};

exports.addProduct = async (data) => {
    const pool = await db();
    const query = `
        INSERT INTO Products (name, price, description, remaining_amount, image, attribute, userID, categoryID)
        VALUES (@name, @price, @description, @remaining_amount, @image, @attribute, @userID, @categoryID);
        SELECT SCOPE_IDENTITY() AS ProductID;
    `;
    const result = await pool
        .request()
        .input('name', sql.NVarChar, data.name)
        .input('price', sql.Int, data.price)
        .input('description', sql.NVarChar, data.description)
        .input('remaining_amount', sql.Int, data.remaining_amount)
        .input('image', sql.NVarChar, data.image)
        .input('attribute', sql.NVarChar, data.attribute)
        .input('userID', sql.Int, data.userID)
        .input('categoryID', sql.Int, data.categoryid)
        .query(query);
    return result.recordset[0].ProductID;
};

exports.updateProduct = async (ProductID, data) => {
    const pool = await db();
    try {
        const query = `
            UPDATE Produts 
            SET name = @name, 
            price = @price, 
            description = @description, 
            remaining_amount = @remaining_amount, 
            image = @image, 
            attribute = @attribute, 
            userID = @userID,
            categoryID = @categoryID
            WHERE id = @productID;
        `;
        const result = await pool 
            .request()
            .input('name', sql.NVarChar, data.name)
            .input('price', sql.Int, data.price)
            .input('description', sql.NVarChar, data.description)
            .input('remaining_amount', sql.Int, data.remaining_amount)
            .input('image', sql.NVarChar, data.image)
            .input('attribute', sql.NVarChar, data.attribute)
            .input('userID', sql.Int, data.userID)
            .input('categoryID', sql.Int, data.categoryID)
            .input('productID', sql.Int, ProductID)
            .query(query);
        return result.rowsAffected;
    }catch (err) {
        console.error('Không thể update sản phẩm vào hệ thống', err)
    }
};

exports.deleteProduct = async (productID) => {
    const pool = await db();
    try {
        const query = `UPDATE Products 
            SET status = 'Deleted'
            WHERE id = @productID;
        `;
        const result = await pool
            .request()
            .input('productID', productID)
            .query(query);
        return result.rowsAffected[0];
    }catch (err) {
        console.error('Không thể xóa sản phẩm trong hệ thống', err);
    }
};

exports.checkProductExists = async (productId) => {
    const pool = await db() // Kết nối từ file cấu hình
    try {
        const query = `SELECT COUNT(*) AS count FROM Products WHERE id = @ProductID`;
        const result = await pool.request()
            .input('ProductID', sql.Int, productId)
            .query(query);
        return result.recordset[0].count > 0; // Trả về true nếu tồn tại
    }catch (err) {
        console.error('Không thể kiểm tra sản phẩm có tồn tại trong hệ thống', err);
    }
};

