const { db } = require('../db');
const sql = require('mssql');

exports.getListCategory = async () => {
    const pool = await db();
    try {
        const query = `SELECT * FROM Category`;
        const result = await pool.request.query(query);
        return result.recordset;
    }catch (err) {
        console.error('Không thể lấy thông tin của danh muc sản phẩm!', err);
    }
}

exports.getProductbyCategory = async (categoryID) => {
    const pool = await db();
    try {
        const query = `SELECT * FROM Products WHERE PC_ID = @CategoryID`;
        const result = await pool.request()
        .input('CategoryID', sql.Int, categoryID)
        .query(query);
        return result.recordset;
    }catch (err) {
        console.error('Không thể lấy thông tin của tất cả sản phẩm!', err);
    }
}

exports.insertCategory = async (data) => {
    const pool = await db();
    const query = `
        INSERT INTO Category (CName, Cate_Descr, Image)
        VALUES (@CName, @Cate_Descr, @Image);
        SELECT SCOPE_IDENTITY() AS CategoryID;
    `;
    const result = await pool
        .request()
        .input('CName', sql.NVarChar, data.CName)
        .input('Cate_Descr', sql.NVarChar, data.Cate_Descr)
        .input('Image', sql.NVarChar, data.Image)
        .query(query);
    return result.recordset[0].CategoryID;
}

exports.updateCategory = async (categoryID, data) => {
    const pool = await db();
    try {
        const query = `
            UPDATE Category 
            SET CName = @CName, 
            Cate_Desrc = @Cate_Desrc, 
            Image = @Image, 
            WHERE CategoryID = @categoryID;
        `;
        const result = await pool 
            .request()
            .input('CName', sql.NVarChar, data.CName)
            .input('Cate_Desrce', sql.Int, data.Cate_Desrce)
            .input('Image', sql.NVarChar, data.Image)
            .input('categoryID', sql.NVarChar, categoryID)
            .query(query);
        return result.rowsAffected;
    }catch (err) {
        console.error('Không thể update danh mục vào hệ thống', err);
    }
}

exports.deleteCategory = async (categoryID) => {
    const pool = await db();
    try {
        const query = `DELETE FROM Category 
            WHERE CategoryID = @categoryID;
        `;
        const result = await pool
            .request()
            .input('categoryID', categoryID)
            .query(query);
        return result.rowsAffected[0];
    }catch (err) {
        console.error('Không thể xóa danh mục trong hệ thống', err);
    }
}

exports.checkCategoryExists = async (categoryId) => {
    const pool = await db() // Kết nối từ file cấu hình
    try {
        const query = `SELECT COUNT(*) AS count FROM Category WHERE CategoryID = @CategoryID`;
        const result = await pool.request()
            .input('CategoryID', sql.Int, categoryId)
            .query(query);
        return result.recordset[0].count > 0; // Trả về true nếu tồn tại
    }catch (err) {
        console.error('Không thể tìm thấy danh mục trong hệ thống', err);
    }
};
