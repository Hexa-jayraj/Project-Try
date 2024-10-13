const mysql = require('mysql');

const dbHost = 'localhost';
const dbUser    = 'root';
const dbPassword = 'password';
const dbName = 'todo_list';

const db = mysql.createPool({
  host: dbHost,
  user: dbUser   ,
  password: dbPassword,
  database: dbName,
});

module.exports = db;
