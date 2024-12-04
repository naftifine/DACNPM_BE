const { db } = require('../db');
const sql = require('mssql');

exports.getUser = async (username) => {
    try {
        const pool = await db(); 
        const result = await pool.request()
            .input('Username', sql.NVarChar, username)
            .query('SELECT * FROM users WHERE Username = @Username');
        if (result.recordset.length > 0) {
            // console.log(result.recordset[0]);
            return result.recordset[0]; 
        } else {
            return null; 
        }
    } catch (error) {
        console.error('Error in getUser:', error);
        return null; 
    }
}
exports.createUser = async (newUser) => {
    try {
        const pool = await db();
        console.log(newUser);
		const result = await pool.request()
			.input('Username', sql.NVarChar, newUser.username)
			.input('Passw', sql.NVarChar, newUser.password)
			.input('CCCD', sql.VarChar, newUser.cccd)
			.input('DateOfBirth', sql.Date, newUser.DateOfBirth)
            .input('Fullname', sql.NVarChar, newUser.Fullname)
            .input('PhoneNumber', sql.NVarChar, newUser.PhoneNumber)
            .input('refresh_token', sql.NVarChar, null)
			.query(`
                INSERT INTO users (Username, Passw, CCCD, DateOfBirth, Fullname, PhoneNumber, refresh_token)
                VALUES (@Username, @Passw, @CCCD, @DateOfBirth, @Fullname, @PhoneNumber, @refresh_token)
            `);
		return result.rowsAffected > 0;
	} catch (error) {
		console.error('Error creating user:', error);
		return false;
	}
}


exports.updateRefreshToken = async (username, refreshToken) => {
    try {
        const pool = await db(); 
        const result = await pool.request()
            .input('Username', sql.NVarChar, username)
            .input('RefreshToken', sql.VarChar, refreshToken)
            .query(`
                UPDATE users
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