const pool = require('./db');

async function testConnection() {
  try {
    const [rows] = await pool.query('SELECT 1 + 1 AS result');
    console.log('DB connection successful:', rows[0].result);
  } catch (err) {
    console.error('DB connection failed:', err);
  }
}

testConnection();
