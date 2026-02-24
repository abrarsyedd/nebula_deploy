const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = process.env.BACKEND_PORT || 5000;

app.use(cors());
app.use(express.json());

// Database connection pool
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'nebuladb',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Test DB Connection and Initialize Tables
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Database connection failed:', err.message);
    } else {
        console.log('Successfully connected to MySQL database.');

        // 1. Create the table automatically if it doesn't exist
        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS system_status (
                id INT AUTO_INCREMENT PRIMARY KEY,
                service_name VARCHAR(100) NOT NULL,
                status VARCHAR(50) NOT NULL,
                last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `;

        connection.query(createTableQuery, (err) => {
            if (err) {
                console.error('Error creating table:', err);
                connection.release();
                return;
            }
            
            console.log('Table system_status is ready.');

            // 2. Check if the table is empty. If it is, insert our data!
            connection.query('SELECT COUNT(*) AS count FROM system_status', (err, results) => {
                if (!err && results[0].count === 0) {
                    const insertMockData = `
                        INSERT INTO system_status (service_name, status) VALUES 
                        ('Frontend UI Engine', 'Operational'),
                        ('Backend API Service', 'Operational'),
                        ('MySQL Database', 'Healthy'),
                        ('Jenkins CI/CD Pipeline', 'Awaiting Triggers')
                    `;
                    connection.query(insertMockData, () => {
                        console.log('Initial mock data successfully inserted!');
                    });
                }
                connection.release();
            });
        });
    }
});

// API Routes
app.get('/api/health', (req, res) => {
    res.json({ status: 'API is running beautifully!' });
});

app.get('/api/status', (req, res) => {
    pool.query('SELECT * FROM system_status', (error, results) => {
        if (error) {
            console.error('Error fetching data:', error);
            return res.status(500).json({ error: 'Database query failed' });
        }
        res.json(results);
    });
});

app.listen(PORT, () => {
    console.log(`Backend server is listening on port ${PORT}`);
});