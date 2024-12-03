const sql = require('mssql');

const config = {
    user: 'sa',      // Tên người dùng SQL Server
    password: '123',  // Mật khẩu SQL Server
    server: 'NAFTIFINE',        // SQL Server host
    database: 'company',  // Tên cơ sở dữ liệu
    options: {
        encrypt: false,           // Đặt true nếu bạn dùng Azure hoặc cần mã hóa
        trustServerCertificate: true, // Yêu cầu nếu dùng chứng chỉ tự ký
    },
    port: 1433                  // Port mặc định của SQL Server
};

// Hàm tạo kết nối
async function connectToDatabase() {
    try {
        const pool = await sql.connect(config);
        console.log('Kết nối SQL Server thành công.');
        return pool; // Trả về connection pool
    } 
    catch (err) {
        console.error('Lỗi kết nối SQL Server:', err);
        throw err;
  }
}

module.exports = {
  connectToDatabase,
  sql
};
