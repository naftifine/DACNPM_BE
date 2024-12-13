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
        const query = `SELECT * FROM Products WHERE id = @CategoryID`;
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
        INSERT INTO Category (name, image)
        VALUES (@name, @image);
        SELECT SCOPE_IDENTITY() AS id;
    `;
    const result = await pool
        .request()
        .input('name', sql.NVarChar, data.name)
        .input('image', sql.NVarChar, data.image    )
        .query(query);
    return result.recordset[0].id;
}

exports.updateCategory = async (categoryID, data) => {
    const pool = await db();
    try {
        const query = `
            UPDATE Category 
            SET name = @name, 
            image = @image, 
            WHERE id= @categoryID;
        `;
        const result = await pool 
            .request()
            .input('name', sql.NVarChar, data.name)
            .input('image', sql.NVarChar, data.image)
            .input('id', sql.NVarChar, categoryID)
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
            WHERE id = @categoryID;
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
        const query = `SELECT COUNT(*) AS count FROM Category WHERE id = @CategoryID`;
        const result = await pool.request()
            .input('CategoryID', sql.Int, categoryId)
            .query(query);
        return result.recordset[0].count > 0; // Trả về true nếu tồn tại
    }catch (err) {
        console.error('Không thể tìm thấy danh mục trong hệ thống', err);
    }
};
