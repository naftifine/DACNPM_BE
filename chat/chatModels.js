const { db } = require('../db');

exports.getMessages = async (sender, receiver) => {
    try {
        const pool = await db();
        const result = await pool.request()
            .input('sender', sender)
            .input('receiver', receiver)
            .query(`
                SELECT id, date_send, content, sender, receiver 
                FROM Message 
                WHERE (sender = @sender AND receiver = @receiver)
                   OR (sender = @receiver AND receiver = @sender)
                ORDER BY Date_Send
            `);
        return result.recordset;
    } catch (error) {
        throw new Error('Error fetching messages: ' + error.message);
    }
};
exports.sendMessages = async (sender, receiver, content) => {
    try {
        const pool = await db();
        const result = await pool.request()
            .input('sender', sender)
            .input('receiver', receiver)
            .input('content', content)
            .query(`
                INSERT INTO Message (content, sender, receiver)
                VALUES (@content, @sender, @receiver)
            `);
        if (result.rowsAffected > 0) 
        {
            // console.log('ok');
            return;
        }
        else
        {
            console.log('Người nhận/người gửi không tồn tại');
        }
        // else throw new Error('Lỗi gửi tin nhắn');
    }
    catch (error) {
        // throw new Error('Lỗi gửi tin nhắn');
    }
}
