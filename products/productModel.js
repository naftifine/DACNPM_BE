const { poolPromise } = require('../db');

const productModel = {
    getAllProducts: async () => {
        const pool = await poolPromise;
        const query = 'SELECT * FROM Products';
        const result = await pool.request().query(query);
        return result.recordset;
    },

    getProductsByCategory: async (categoryID) => {
        const pool = await poolPromise;
        const query = 'SELECT * FROM Products WHERE CategoryID = @CategoryID';
        const result = await pool
            .request()
            .input('CategoryID', categoryID)
            .query(query);
        return result.recordset;
    },

    addProduct: async (productName, categoryID) => {
        const pool = await poolPromise;
        const query = `
            INSERT INTO Products (ProductName, CategoryID)
            VALUES (@ProductName, @CategoryID);
            SELECT SCOPE_IDENTITY() AS ProductID;
        `;
        const result = await pool
            .request()
            .input('ProductName', productName)
            .input('CategoryID', categoryID)
            .query(query);
        return result.recordset[0].ProductID;
    },

    deleteProduct: async (productID) => {
        const pool = await poolPromise;
        const query = 'DELETE FROM Products WHERE ProductID = @ProductID';
        const result = await pool
            .request()
            .input('ProductID', productID)
            .query(query);
        return result.rowsAffected[0];
    },
};

module.exports = productModel;
