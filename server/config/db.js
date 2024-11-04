const mysql = require('mysql2');
require('dotenv').config();

const dbconnection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

dbconnection.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Database connected successfully');
    }
}); 

module.exports = dbconnection;