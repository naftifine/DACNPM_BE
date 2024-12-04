const express = require('express');
const { db } = require('./db'); 

const app = express();
const port = 3000; 

const userRoutes = require('./users/userRoutes');
const authRoutes = require('./auth/authRoutes');

app.use(express.json());

app.use('/users', userRoutes);

app.use('/auth', authRoutes);

app.listen(port, () => {
    console.log(`Server đang chạy tại http://localhost:${port}`);
});
