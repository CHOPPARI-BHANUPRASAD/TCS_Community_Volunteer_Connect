// Import the MySQL2 module for database connectivity
const mysql = require('mysql2');

// Create connection pool for better performance
const pool = mysql.createPool({
  host: 'localhost',      // Host where MySQL server is running (local machine)
  user: 'root',           //  MySQL username
  password: 'admin',      //  MySQL password
  database: 'volunteer_connect_db', // Name of the database to connect to
  waitForConnections: true,   // Wait for an available connection instead of throwing an error
  connectionLimit: 10,    // Maximum number of connections in the pool  
  queueLimit: 0      // No limit on the number of queued connection requests
});

// Test connection
pool.getConnection((err, connection) => {
  if (err) {
    // If there is an error, log it and stop the server
    console.error(' Database connection failed:', err.message);
    process.exit(1);
  }
  // If connection is successful, print a success message
  console.log(' Connected to MySQL Database');
  // Release the connection back to the pool after testing
  connection.release();
});

// Export promise-based pool 
module.exports = pool.promise();
