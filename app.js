const express = require('express');
const { db } = require('./db'); 

const app = express();
const port = 3000; 

const userRoutes = require('./routes/userRoutes');

app.use(express.json());

app.use('/users', userRoutes);


app.listen(port, () => {
    console.log(`Server đang chạy tại http://localhost:${port}`);
});
