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


exports.searchByName = async (name) => {
    console.log(name);
    const pool = await db(); 
    try {
        // Build the query to search products by name
        const query = `
            SELECT * 
            FROM Products 
            WHERE name LIKE CONCAT('%', @name, '%')
        `;

        // Use parameterized query to avoid SQL injection
        const result = await pool.request()
            .input('name', name) 
            .query(query);
        return result.recordset; 
    } catch (err) {
        console.error('Không thể tìm kiếm sản phẩm theo tên!', err);
        throw err; // Re-throw the error to be handled by the caller
    }
};

exports.getProductById = async (productId) => {
    const pool = await db();  // Kết nối tới DB
    try {
        // Câu truy vấn SQL để lấy sản phẩm theo productId
        const query = 'SELECT * FROM Products WHERE productid = @productId';

        // Thực thi câu truy vấn với tham số productId
        const result = await pool.request()
            .input('productId', sql.Int, productId) // Đặt giá trị cho tham số
            .query(query);  // Thực thi câu truy vấn

        // Nếu không có sản phẩm nào, trả về null
        if (result.recordset.length === 0) {
            return null;
        }

        // Trả về sản phẩm tìm thấy
        return result.recordset[0];
    } catch (error) {
        console.error("Error fetching product by ID:", error);
        throw new Error('Unable to fetch product details');
    }
};

exports.getProductByUserId = async (userid) => {
    const pool = await db();  // Kết nối tới DB
    try {
        // Câu truy vấn SQL để lấy sản phẩm theo productId
        const query = 'SELECT * FROM Products WHERE userid = @userid';

        // Thực thi câu truy vấn với tham số productId
        const result = await pool.request()
            .input('userid', sql.Int, userid) // Đặt giá trị cho tham số
            .query(query);  // Thực thi câu truy vấn
        if (result.recordset.length === 0) {
            return null;
        }

        // Trả về sản phẩm tìm thấy
        return result.recordset;
    } catch (error) {
        console.error("Error fetching product by ID:", error);
        throw new Error('Unable to fetch product details');
    }
};

exports.addProduct = async (data) => {
    try {
        const pool = await db();
        const query = `
            INSERT INTO Products (name, price, description, remaining_amount, image, attribute, userID, categoryid)
            VALUES (@name, @price, @description, @remaining_amount, @image, @attribute, @userID, @categoryid);
            SELECT SCOPE_IDENTITY() AS ProductID;
        `;

        const result = await pool
            .request()
            .input('name', sql.NVarChar, data.name)
            .input('price', sql.Int, data.price)
            .input('description', sql.NVarChar, data.description)
            .input('remaining_amount', sql.Int, data.remaining_amount)
            .input('image', sql.NVarChar, data.image) // Chắc chắn `image` là chuỗi, nếu không có giá trị sẽ là null
            .input('attribute', sql.NVarChar, data.attribute)
            .input('userID', sql.Int, data.userID)
            .input('categoryid', sql.Int, data.categoryid)
            .query(query);
        return result.recordset[0].ProductID;
    } catch (err) {
        console.error('Error while adding product:', err);
        throw new Error('Failed to add product');
    }
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

