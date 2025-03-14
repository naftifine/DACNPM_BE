const { db } = require('../db');
const sql = require('mssql');

exports.getUser = async (username) => {
    try {
        const pool = await db(); 
        const result = await pool.request()
            .input('Username', sql.NVarChar, username)
            .query('SELECT * FROM users WHERE Username = @Username');
        if (result.recordset.length > 0) {
            const user = result.recordset[0];
            
            if (user.DateOfBirth) {
                user.DateOfBirth = new Date(user.DateOfBirth).toISOString().split('T')[0];
            }
            
            return user; 
        } else {
            return null; 
        }
    } catch (error) {
        console.error('Error in getUser:', error);
        return null; 
    }
}

exports.getUserById = async (userid) => {
    try {
        const pool = await db(); 
        const result = await pool.request()
            .input('userid', sql.Int, userid) 
            .query('SELECT * FROM users WHERE userid = @userid'); 

        if (result.recordset.length > 0) {
            const user = result.recordset[0];

            // Định dạng lại ngày sinh (nếu có)
            if (user.DateOfBirth) {
                user.DateOfBirth = new Date(user.DateOfBirth).toISOString().split('T')[0];
            }

            return user; // Trả về thông tin người dùng
        } else {
            return null; // Không tìm thấy user
        }
    } catch (error) {
        console.error('Error in getUserById:', error);
        return null; // Trả về null trong trường hợp xảy ra lỗi
    }
};

exports.createUser = async (newUser) => {
    try {
        const pool = await db();
        console.log(newUser);
		const result = await pool.request()
			.input('Username', sql.NVarChar, newUser.username)
			.input('password', sql.NVarChar, newUser.password)
			.input('CCCD', sql.VarChar, newUser.cccd)
			.input('DateOfBirth', sql.Date, newUser.DateOfBirth)
            .input('Fullname', sql.NVarChar, newUser.Fullname)
            .input('PhoneNumber', sql.NVarChar, newUser.PhoneNumber)
            .input('refresh_token', sql.NVarChar, null)
			.query(`
                INSERT INTO users (Username, password, CCCD, DateOfBirth, Fullname, PhoneNumber, refresh_token)
                VALUES (@Username, @password, @CCCD, @DateOfBirth, @Fullname, @PhoneNumber, @refresh_token)
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

exports.editUser = async (user) => {
    try {
        const pool = await db();
        const result = await pool.request()
            .input('username', user.username)
            .input('password', user.password)
            .input('dateofbirth', user.dateofbirth + 'T00:00:00Z')
            .input('fullname', user.fullname)
            .input('phonenumber', user.phonenumber)
            .query(`
                UPDATE [users]
                SET password = @password,
                    dateofbirth = @dateofbirth,
                    fullname = @fullName,
                    phonenumber = @phonenumber
                WHERE username = @username
            `);
        if (result.rowsAffected[0] === 0) {
            throw new Error('User không tồn tại');
        }
        return result;
    }
    catch (error) {
        throw new Error('Error updating user: ' + error.message);
    }
}