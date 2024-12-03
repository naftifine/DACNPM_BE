const express = require('express');
const { connectToDatabase } = require('./db'); 

const app = express();
const port = 3000; 

app.use(express.json());

let pool; 
    (async () => {
    try {
        pool = await connectToDatabase();
        console.log('Connection pool đã sẵn sàng.');
    } 
    catch (err) {
        console.error('Lỗi khi kết nối database:', err);
        process.exit(1); 
    }
})();

app.get('/', (req, res) => {
    res.send('Welcome to the SQL Server backend!');
});

app.get('/date', async (req, res) => {
    try {
        const result = await pool.request().query('SELECT GETDATE() AS CurrentDate');
        res.json(result.recordset); 
    } 
    catch (err) {
        console.error('Lỗi khi chạy query:', err);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/users', async (req, res) => {
    try {
        const result = await pool.request().query('SELECT * FROM Users'); 
        res.json(result.recordset);
    } 
    catch (err) {
        console.error('Lỗi khi chạy query:', err);
        res.status(500).send('Internal Server Error');
  }
});


app.listen(port, () => {
    console.log(`Server đang chạy tại http://localhost:${port}`);
});
