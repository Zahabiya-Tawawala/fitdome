const express = require("express")
const app = express()

// root route
app.get("/", (req,res) => {res.send("hello world this is zahabiya running port on 5001")})

// port 5001 running the server
const port = 5001 // add env after env is made 
app.listen(port, () => {console.log(`Server is running on port ${port}`)})




// this is what sujit wrote 
// const express = require("express");
// const app = express();

// // root route
// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });


// // port 5001 running the server
// const port = 5001;
// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });
