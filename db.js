// db.js
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'shannu', // add your MySQL root password if you have one
  database: 'work_for_people'
});

connection.connect((err) => {
  if (err) {
    console.error('MySQL connection failed ❌', err);
  } else {
    console.log('MySQL connected ✅');
  }
});

module.exports = connection;
