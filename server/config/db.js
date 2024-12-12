const mysql = require("mysql2");

const dbconnection = async () => {
  try {
    const connect = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
    });
    console.log(`Database connected successfully ${process.env.DB_NAME} ${process.env.DB_HOST}`);
    return connect;  // return the connection
  } catch (error) {
    console.log("Database connection failed", error.message);
    process.exit(1);  
}

}

module.exports = dbconnection;


// dbconnection.connect((err) => {
//   if (err) {
//     console.log("Database connection failed", err.message);
//   } else {
//     console.log("Database connected successfully");
//   }
// });