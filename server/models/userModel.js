const db = require("../config/db");
const bcrypt = require("bcryptjs");

const checkUserInTables = async (table, email, password) => {
  try {
    const allowedTables = ["center_admin", "gym_admins", "users"];
    if (!allowedTables.includes(table)) {
      throw new Error("Invalid role specified");
    }

    let query, params;
    switch (table) {
      case "center_admin":
        query = `SELECT admin_gmail AS email, admin_password AS password FROM center_admin WHERE admin_gmail = ? LIMIT 1`;
        params = [email];
        break;
      case "gym_admins":
        query = `SELECT gym_email AS email, gym_password AS password FROM gym_admins WHERE gym_email = ? LIMIT 1`;
        params = [email];
        break;
      case "users":
        query = `SELECT email, password FROM users WHERE email = ? LIMIT 1`;
        params = [email];
        break;
    }

    console.log(`Executing query on ${table}: ${query}`);

    // Get a database connection from the pool
    const pool = await db();
    const [results] = await pool.query(query, params); // Use pool.query()

    if (results.length === 0) {
      return { success: false, user: null }; // No user found
    }

    // // execute the query
    // const [results] = await db.promise().query(query, params);
    // if (results.length === 0) {
    //   return { success: false, user: null }; // No user found
    // }

    const user = results[0];

    // Check if the user has a password and it exists before comparing
    if (!user.password) return { success: false, user: null }; // No password found

    // Compare the provided password with the hashed password stored in the DB
    const isMatch = await bcrypt.compare(password, user.password);
    return { success: isMatch, user: isMatch ? user : null }; // Password matches return standardized response
  } catch (error) {
    console.error(`Error in checkUserInTables: ${error.message}`);
    throw error; // Throw error to be handled by caller
  }
};

module.exports = { checkUserInTables };

// const db = require("../config/db");
// const bcrypt = require("bcryptjs");

// const checkUserInTables = async (table, email, password, callback) => {
//   try {
//     const allowedTables = ["center_admin", "gym_admins", "users"];
//     if (!allowedTables.includes(table)) {
//       return callback(new Error("Invalid role specified"), null);
//     }

//     let query, params;
//     switch (table) {
//       case "center_admin":
//         query = `SELECT * FROM center_admin WHERE admin_gmail = ? LIMIT 1`;
//         params = [email];
//         break;
//       case "gym_admins":
//         query = `SELECT * FROM gym_admins WHERE gym_email = ? LIMIT 1`;
//         params = [email];
//         break;
//       case "users":
//         query = `SELECT * FROM users WHERE email = ? LIMIT 1`;
//         params = [email];
//         break;
//     }

//     console.log(`Executing query on ${table}: ${query}`);

//     const dbPromise = db.promise();

//     // execute the query
//     const [results] = await dbPromise.query((query, params));
//     if (results.length === 0)
//       return callback(null, { success: false, user: null }); // No user found

//     const user = results[0];

//     // Check if the user has a password and it exists before comapring
//     if (!user.password) return callback(null, { success: false, user: null }); // No password found

//     // compare the provided password with the hashed password stored in the DB

//     const isMatch = await bcrypt.compare(password, user.password);
//     return callback(null, { success: isMatch, user: isMatch ? user : null }); // Password matches return standardized response
//   } catch (error) {
//     console.error(`Error in checkUserInTable: ${error.message}`);
//     return callback(error, null);
//   }
// };

// module.exports = { checkUserInTables };

// const dbconnection = require("../config/db");
// const bcrypt = require("bcryptjs");

// // User model configuration for role-based authentication login rules this is a object with key value pairs wiithin the object
// const loginRules = {
//   center_admin: {
//     table: "center_admin",
//     loginFields: ["admin_gmail"],
//     passwordField: "admin_password",
//   },
//   gym_admins: {
//     table: "gym_admins",
//     loginFields: ["gym_email"],
//     passwordField: "gym_password",
//     usernameField: "gym_name",
//   },
//   users: {
//     table: "users",
//     loginFields: ["email"],
//     passwordField: "password",
//     usernameField: "username",
//   },
// };

// // // Function to dynamically build and execute login query
// // const checkUserInTable = (role, identifier, password, callback) => {
// //   const rule = loginRules[role];
// //   if (!rule) return callback(new Error("Invalid role specified"), null);

// //   // Generate SQL conditions for login fields
// //   const conditions = rule.loginFields
// //     .map((field) => `${field} = ?`)
// //     .join(" OR ");
// //   const query = `SELECT * FROM ${rule.table} WHERE ${conditions} LIMIT 1`;
// //   const queryParams = Array(rule.loginFields.length).fill(identifier);

// //   // Log the query for debugging
// //   console.log(`Executing query on ${rule.table}: ${query}`);

// //   // Execute the query
// //   dbconnection.query(query, queryParams, (err, results) => {
// //     if (err) return callback(err, null);
// //     if (results.length === 0) return callback(null, null); // No user found

// //     const user = results[0];
// //     console.log(`User found in ${role}:`, user);

// //     // Compare the provided password with the hashed password stored in the DB
// //     bcrypt.compare(password, user[rule.passwordField], (err, isMatch) => {
// //       if (err) return callback(err, null);
// //       if (isMatch) return callback(null, user); // Password matches
// //       return callback(null, null); // Password doesn't match
// //     });
// //   });
// // };

// // Function to check the user across all tables
// const checkUserInAllTables = (identifier, callback) => {
//   const roles = Object.keys(loginRules); // Get all roles from loginRules
//   let foundUser = null;

//   const checkNextRole = (index) => {
//     if (index >= roles.length) {
//       // If no more roles to check, return the found user or null
//       return callback(null, foundUser);
//     }

//     const role = roles[index]; // Get the current role
//     const rule = loginRules[role]; // Get the login rule for the current role

//     // Generate SQL conditions for login fields
//     const conditions = rule.loginFields
//       .map((field) => `${field} = ?`)
//       .join(" OR ");
//     const query = `SELECT * FROM ${rule.table} WHERE ${conditions} LIMIT 1`;
//     const queryParams = Array(rule.loginFields.length).fill(identifier);

//     // // Execute the query for the current role
//     // dbconnection.query(query, queryParams, (err, results) => {
//     //   if (err) return callback(err, null);

//     //   if (results.length > 0) {
//     //     // If a user is found, attach the role and return
//     //     foundUser = { ...results[0], role };
//     //     return callback(null, foundUser);
//     //   }

//     //   // Check the next role
//     //   checkNextRole(index + 1);
//     // });

//     dbconnection.query(query, queryParams, (err, results) => {
//       if (err) {
//         console.error(`Error querying ${rule.table}:`, err);
//         return callback(err, null);
//       }
//       if (results.length > 0) {
//         console.log(`User found in ${rule.table}:`, results[0]);
//         foundUser = { ...results[0], role };
//         return callback(null, foundUser);
//       }
//       console.log(`No user found in ${rule.table}`);
//       checkNextRole(index + 1);
//     });
//   };

//   // Start checking from the first role
//   checkNextRole(0);
// };

// // ------------------------------------- Register function for creating new users ---------------------------------------
// // Function to create a new user in the specified role's table
// const createUser = (
//   role,
//   identifier,
//   hashedPassword,
//   username,
//   gymDocuments,
//   callback
// ) => {
//   const table = loginRules[role]?.table;
//   const passwordField = loginRules[role]?.passwordField;
//   const emailField = loginRules[role]?.loginFields[0];
//   const usernameField = loginRules[role]?.usernameField;

//   if (!table || !passwordField || !usernameField)
//     return callback(new Error("Invalid role specified"));

//   let query;
//   let queryParams;

//   if (role === "gym_admins") {
//     query = `INSERT INTO ${table} (${emailField}, ${passwordField}, ${usernameField}, gym_documents) VALUES (?, ?, ?, ?)`;
//     queryParams = [identifier, hashedPassword, username, gymDocuments];
//   } else {
//     query = `INSERT INTO ${table} (${emailField}, ${passwordField}, ${usernameField}) VALUES (?, ?, ?)`;
//     queryParams = [identifier, hashedPassword, username];
//   }

//   //   const query = `INSERT INTO ${table} ( ${usernameField} ,${emailField}, ${passwordField}) VALUES (?, ?, ?)`;
//   //   const queryParams = [username, identifier, hashedPassword];

//   dbconnection.query(query, queryParams, (err, result) => {
//     if (err) return callback(err);
//     return callback(null, result);
//   });
// };

// // Export the function for use in your controllers and routes
// module.exports = { checkUserInAllTables, createUser, loginRules };

// // const checkUserInDb = async (table, loginFields, loginData) => {
// //     const loginField = loginFields[0]
// //     const loginValue = loginData[loginField]
// //     const query = `SELECT * FROM ${table} WHERE ${loginField} = ?`
// //     return new Promise((resolve, reject) => {
// //         dbconnection.query(query, [loginValue], (err, results) => {
// //             if (err) {
// //                 reject(err)
// //             } else {
// //                 resolve(results)
// //             }
// //         })
// //     })
// // }

// // const loginRules = {
// //  center_admin: {table: "center_admin", id: "center_admin_id", password: "password"},
// //  gym_admins: {table: "gym_admins", id: "gym_admin_id", password: "password"},
// //  users: {table: "users", id: "user_id", password: "password"}
// // }
