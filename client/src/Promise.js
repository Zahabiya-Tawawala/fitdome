// const axios = require("axios");
// The new error message indicates two main issues:

// require is not defined in ES modules:

// Your project is configured to use ES module syntax (based on the package.json containing "type": "module").
// In ES modules, require is not supported. Instead, you need to use import statements.
// Solution Direction:

// Either update the code to use ES module syntax (import), or adjust your project to use CommonJS syntax.
// Here is how you can update the code to use import:

// Replace require("axios") with import axios from "axios".
// Replace module.exports = { ... } with export default { ... }.
// Here is how the updated code would look:

// import axios from "axios";

// let response = axios.get("https://httpstat.us/404");
// console.log(response);

// http stas link for 404 error
// https://httpstatuses.com/404
// import { get } from "../../server/routes/authRoutes";

// let reponse = axios.get("https://httpstat.us/404")


// TRYING PROMISES WIth try n catch error codes 

import axios from "axios";

async function getResponse() {
    try {
        let response = await axios.get("https://httpstat.us/500");
        console.log(response.data.activity);
    } catch (error) {
        console.error(`ERROR: ${error}`);
    }
}

getResponse();

// this is a synchronoues code task where the result s shown instantly
let a = 10;
let b = 20;

let sum = a + b;
console.log(sum);

// this is an asynchronous code task where the result is shown after 2 seconds
setTimeout(() => {
    let a = 10;
    let b = 20;

    let sum = a + b;
    console.log(sum);
}, 2000);
// hence asynchronous code are used when we want to wait for some time before the result is shown especially when we are fetching data from an API or database or any other open files or network requests


// coffee shop example for promises 

const whereismyCoffee = function (orderId) {
    return new Promise((resolve, reject) => {
        coffeeApi.checkStatus(orderId, (error, coffeeStatus) => {   
            if(error){
                // promise not fulfilled or rejected 
                reject(error);
            }
            else{
                // promise is fulfilled 
                resolve(coffeeStatus);
            }
        })
    })
    
}

// higher order functions on arrays 

const student = ["piyush", "garg", "jane"]
// what we usually do to print the values of the array
for (let i =0 ; i< student.length; i++){
    console.log(student[i])
}
// but this time we will use hof and do the same thing with foreach 
function print(val){ // this is the callback function
    console.log(val)  
}

student.forEach(print) //paaing the callback function to the foreach function as an argument