const express = require('express');
const { db } = require('./db'); 
require('dotenv').config();

const app = express();
// const port = 3000; 

const userRoutes = require('./users/userRoutes');
const authRoutes = require('./auth/authRoutes');
const productRoutes = require('./products/productRoutes');
const categoryRoutes = require('./category/categoryRoutes');

app.use(express.json());

app.use('/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/category', categoryRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${process.env.PORT}`);
});
