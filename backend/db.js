// db.js
const mysql = require("mysql2/promise"); // <- promise API

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "userdb",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// optional: sanity check at startup
(async () => {
  const conn = await pool.getConnection();
  console.log("Connected to MySQL Database ✅");
  conn.release();
})().catch(err => {
  console.error("MySQL connection failed ❌", err);
});

module.exports = pool;
