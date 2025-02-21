
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: process.env.DATABASE_LOCAL_HOST,
  user: process.env.DATABASE_USER_NAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME
});

module.exports = db;


