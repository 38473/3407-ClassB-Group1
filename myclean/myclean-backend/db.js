const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'myclean.c3as8c8e0uku.ap-southeast-2.rds.amazonaws.com',  
  user: 'admin',            
  password: '131325879',        
  database: 'mydb',         
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;
