const { db } = require('../db');

exports.getMessages = async (senderId, receiverId) => {
    try {
        const pool = await db();
        const result = await pool.request()
            .input('SenderID', senderId)
            .input('ReceiverID', receiverId)
            .query(`
                SELECT Mess_ID, Date_Send, Content, SenderID, ReceiverID 
                FROM Messages 
                WHERE (SenderID = @SenderID AND ReceiverID = @ReceiverID)
                   OR (SenderID = @ReceiverID AND ReceiverID = @SenderID)
                ORDER BY Date_Send
            `);
        return result.recordset;
    } catch (error) {
        throw new Error('Error fetching messages: ' + error.message);
    }
};
