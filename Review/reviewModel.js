const { db } = require('../db');
const sql = require('mssql');


exports.getReviewByProduct = async (ProductID) => {
    const pool = await db();
    try {
        const query = `SELECT * FROM Review WHERE productID = @ProductID`;
        const result = await pool
        .request()
        .input('ProductID', sql.Int, ProductID)
        .query(query);
        return result.recordset;
    }catch (err) {
        console.error('Không thể lấy đánh giá của sản phẩm!', err);
    }
};

exports.addReviewInProduct = async (data) => {
    const pool = await db();
    const query = `
        INSERT INTO Review (productID, userID, content, rating)
        VALUES (@productID, @userID, @content, @rating);
        SELECT SCOPE_IDENTITY() AS ReviewID;
    `;
    const result = await pool
        .request()
        .input('productID', sql.Int, data.productID)
        .input('userID', sql.Int, data.userID)
        .input('content', sql.NVarChar, data.content)
        .input('rating', sql.Int, data.rating)
        .query(query);
    return result.recordset[0].ReviewID;
};

exports.updateReviewContent = async (reviewID, data) => {
    const pool = await db();
    try {
        const query = `
            UPDATE Review 
            SET content = @content
            WHERE id = @reviewID;
        `;
        const result = await pool 
            .request()
            .input('content', sql.NVarChar, data.content)
            .input('reviewID', sql.Int, reviewID)
            .query(query);
        return result.rowsAffected;
    }catch (err) {
        console.error('Không thể update nội dung comment vào hệ thống', err)
    }
};

exports.deleteReview = async (reviewID) => {
    const pool = await db();
    try {
        const query = `DELETE FROM Review
            WHERE id = @reviewID;
        `;
        const result = await pool
            .request()
            .input('reviewID', reviewID)
            .query(query);
        return result.rowsAffected[0];
    }catch (err) {
        console.error('Không thể xóa comment trong hệ thống', err);
    }
};

exports.checkReviewExists = async (reviewId) => {
    const pool = await db() // Kết nối từ file cấu hình
    try {
        const query = `SELECT COUNT(*) AS count FROM Review WHERE id = @reviewID`;
        const result = await pool.request()
            .input('reviewID', sql.Int, reviewId)
            .query(query);
        return result.recordset[0].count > 0; // Trả về true nếu tồn tại
    }catch (err) {
        console.error('Bình luận không có tồn tại trong hệ thống', err);
    }
};

