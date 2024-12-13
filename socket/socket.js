const { Server } = require('socket.io');
const chatModel = require('../chat/chatModels');

module.exports = (server) => {
    const io = new Server(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST'],
        },
    });

    io.on('connection', (socket) => {
        console.log(`User connected: ${socket.id}`);

        socket.on('join_room', ({ user1, user2 }) => {
            const roomId = [user1, user2].sort().join('-');
            socket.join(roomId);
            // console.log(`${socket.id} joined room ${roomId}`);
        });

        // Handle sending messages
        socket.on('send_message', ({ sender, receiver, message }) => {
            const roomId = [sender, receiver].sort().join('-');
            const timestamp = new Date().toISOString();

            socket.to(roomId).emit('receive_message', { sender, message, timestamp });

            chatModel.sendMessages(sender, receiver, message);
        });

        // Handle user disconnect
        socket.on('disconnect', () => {
            console.log(`User disconnected: ${socket.id}`);
        });
    });
};
