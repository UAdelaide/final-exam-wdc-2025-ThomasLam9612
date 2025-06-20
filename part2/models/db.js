const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  // host: 'localhost',
  socketPath: '/var/run/mysqld/mysqld.sock',
  user: 'root',
  database: 'DogWalkService',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;
