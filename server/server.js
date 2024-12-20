const express = require("express");
const dotenv = require("dotenv").config();
const dbconnection = require("./config/db");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");

dbconnection();

const app = express();

// Middleware for JSON parsing
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

























// const express = require("express");
// const app = express();
// const dbconnection = require("./config/db");
// const authRoutes = require("./routes/authRoutes");
// const cors = require("cors");
// require('dotenv').config();
// // Initialize database connection
// dbconnection(); // Ensure proper error handling in db.js

// // Middleware for CORS
// app.use(cors());

// // Middleware for JSON parsing
// app.use(express.json());

// // Auth routes from authRoutes.js
// app.use("/auth", authRoutes);

// // Root route
// app.get("/", (req, res) => {
//   res.send("Hello world! This is Zahabiya running on port 5001.");
// });

// // Port configuration and server start
// const port = process.env.PORT || 5001;
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

// // const express = require("express")
// // const app = express()
// // const dbconnection = require("./config/db")
// // const authRoutes = require("./routes/authRoutes")
// // const cors = require("cors")
// // require("dotenv").config();

// // dbconnection()

// // // cors middleware??
// // app.use(cors())

// // // auth routes from authRoutes.js
// // app.use(express.json())
// // app.use("/auth", authRoutes)

// // // root route
// // app.get("/", (req,res) => {res.send("hello world this is zahabiya running port on 5001")})

// // // port 5001 running the server
// // const port = process.env.PORT || 5001 // add env after env is made
// // app.listen(port, () => {console.log(`Server is running on port ${port}`)})

// // // this is what sujit wrote
// // // const express = require("express");
// // // const app = express();

// // // // root route
// // // app.get("/", (req, res) => {
// // //   res.send("Hello World!");
// // // });

// // // // port 5001 running the server
// // // const port = 5001;
// // // app.listen(port, () => {
// // //   console.log(`Example app listening on port ${port}`);
// // // });
