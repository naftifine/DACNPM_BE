const { db } = require('../db');
const sql = require('mssql');


exports.getAllProducts = async () => {
    const pool = await db();
    try {
        const query = `SELECT * FROM Products WHERE StatusPro != 'Deleted'`;
        const result = await pool.request.query(query);
        return result.recordset;
    }catch (err) {
        console.error('Không thể lấy thông tin của tất cả sản phẩm!', err);
    }
};

exports.addProduct = async (data) => {
    const pool = await db();
    const query = `
        INSERT INTO Products (PName, SellPrice, Pr_Descr, Amount, TimeUpload, ImagePd, Attribute, StatusPro, SellerID, PC_ID)
        VALUES (@PName, @SellPrice, @Pr_Descr, @Amount, @TimeUpload, @ImagePd, @Attribute, @StatusPro, @SellerID, @PC_ID);
        SELECT SCOPE_IDENTITY() AS ProductID;
    `;
    const result = await pool
        .request()
        .input('PName', sql.NVarChar, data.PName)
        .input('SellPrice', sql.Int, data.SellPrice)
        .input('Pr_Descr', sql.NVarChar, data.Pr_Descr)
        .input('Amount', sql.Int, data.Amount)
        .input('TimeUpload', sql.DateTime, data.TimeUpload)
        .input('ImagePd', sql.NVarChar, data.ImagePd)
        .input('Attribute', sql.NVarChar, data.Attribute)
        .input('StatusPro', sql.NVarChar, data.StatusPro)
        .input('SellerID', sql.Int, data.SellerID)
        .input('PC_ID', sql.Int, data["PC_ID"])
        .query(query);
    return result.recordset[0].ProductID;
};

exports.updateProduct = async (ProductID, data) => {
    const pool = await db();
    try {
        const query = `
            UPDATE Produts 
            SET PName = @PName, 
            SellPrice = @SellPrice, 
            Pr_Descr = @Pr_Descr, 
            Amount = @Amount, 
            TimeUpload = @TimeUpload, 
            ImagePd = @ImagePd, 
            Attribute = @Attribute, 
            StatusPro = @StatusPro, 
            PC_ID = @PC_ID
            WHERE ProductID = @productID;
        `;
        const result = await pool 
            .request()
            .input('PName', sql.NVarChar, data.PName)
            .input('SellPrice', sql.Int, data.SellPrice)
            .input('Pr_Descr', sql.NVarChar, data.Pr_Descr)
            .input('Amount', sql.Int, data.Amount)
            .input('TimeUpload', sql.DateTime, data.TimeUpload)
            .input('ImagePd', sql.NVarChar, data.ImagePd)
            .input('Attribute', sql.NVarChar, data.Attribute)
            .input('StatusPro', sql.NVarChar, data.StatusPro)
            .input('PC_ID', sql.Int, data["PC_ID"])
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
            SET StatusPro = 'Deleted'
            WHERE ProductID = @productID;
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
        const query = `SELECT COUNT(*) AS count FROM Products WHERE ProductID = @ProductID`;
        const result = await pool.request()
            .input('ProductID', sql.Int, productId)
            .query(query);
        return result.recordset[0].count > 0; // Trả về true nếu tồn tại
    }catch (err) {
        console.error('Không thể kiểm tra sản phẩm có tồn tại trong hệ thống', err);
    }
};

