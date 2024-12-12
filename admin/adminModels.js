const { db } = require('../db');
const sql = require('mssql');

exports.getUser = async (username) => {
    try {
        const pool = await db(); 
        const result = await pool.request()
            .input('Username', sql.NVarChar, username)
            .query('SELECT * FROM Admin WHERE Username = @Username');
        if (result.recordset.length > 0) {
            const user = result.recordset[0];
            return user; 
        } else {
            return null; 
        }
    } catch (error) {
        console.error('Error in getUser:', error);
        return null; 
    }
}

exports.updateRefreshToken = async (username, refreshToken) => {
    try {
        const pool = await db(); 
        const result = await pool.request()
            .input('Username', sql.NVarChar, username)
            .input('RefreshToken', sql.VarChar, refreshToken)
            .query(`
                UPDATE Admin
                SET refresh_token = @RefreshToken
                WHERE Username = @Username
            `);
        
        if (result.rowsAffected[0] > 0) {
            return true; 
        } else {
            return false; 
        }
    } catch (error) {
        console.error('Error in updateRefreshToken:', error);
        return false;
    }
};