const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
const port = 3002;

app.use(cors());
app.use(express.json());

// MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'hema_db',
    port: 3308 // Updated port
});

connection.connect(err => {
    if (err) throw err;
    console.log('Connected to MySQL Database!');
});

// Search API endpoint
app.get('/search', (req, res) => {
    const query = req.query.query;
    const sql = `SELECT * FROM inhibitors WHERE \`Compound Name\` LIKE ?`;
    connection.query(sql, [`%${query}%`], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database query error' });
        }
        res.json(results);
    });
});

// Login API endpoint
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
    connection.query(sql, [username, password], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database query error' });
        }
        if (results.length > 0) {
            res.json({ success: true });
        } else {
            res.json({ success: false });
        }
    });
});

// Signup API endpoint
app.post('/signup', (req, res) => {
    const { username, password } = req.body;
    const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
    connection.query(sql, [username, password], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database insert error' });
        }
        res.json({ success: true });
    });
});

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
