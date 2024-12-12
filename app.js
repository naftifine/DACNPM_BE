const express = require('express');
const cors = require('cors');
// const { db } = require('./db'); 
require('dotenv').config();


const app = express();
// const port = 3000; 

app.use(cors({
    origin: 'http://localhost:3000', // Frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Các phương thức được phép
    credentials: true, // Cho phép gửi cookie, nếu cần
  }));


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

app.listen(process.env.PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${process.env.PORT}`);
});
