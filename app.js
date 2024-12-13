const express = require('express');
const cors = require('cors');
// const { db } = require('./db'); 
require('dotenv').config();
const http = require('http');


const app = express();
// const port = 3000; 

app.use(cors());


const userRoutes = require('./users/userRoutes');
const authRoutes = require('./auth/authRoutes');
const productRoutes = require('./products/productRoutes');
const categoryRoutes = require('./category/categoryRoutes');
const chatRoutes = require('./chat/chatRoutes');
const adminRoutes = require('./admin/adminRoutes');

app.use(express.json());

app.use('/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/category', categoryRoutes);
app.use('/chat', chatRoutes);
app.use('/admin', adminRoutes);


const setupSocket = require('./socket/socket');
const server = http.createServer(app);
setupSocket(server);

server.listen(process.env.SOCKET_PORT, () => {
    console.log(`Socket đang chạy tại ${process.env.SOCKET_PORT}`);
});

app.listen(process.env.PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${process.env.PORT}`);
});
