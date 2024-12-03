const { db } = require('../db');
const sql = require('mssql');

async function getUser(username) {
    try {
        const pool = await db(); 
        const result = await pool.request()
            .input('Username', sql.NVarChar, username)
            .query('SELECT Username FROM users WHERE Username = @Username');
        if (result.recordset.length > 0) {
            return result.recordset[0].Username; 
        } else {
            return null; 
        }
    } catch (error) {
        console.error('Error in getUser:', error);
        return null; 
    }
}

module.exports = { getUser };
