const dbconnection = require("../config/db");
const bcrypt = require("bcryptjs");

// User model configuration for role-based authentication login rules
const loginRules = { 
    center_admin: { table: "center_admin", loginFields: ["admin_gmail"] },
    gym_admins: { table: "gym_admins", loginFields: ["gym_email"] },
    users: { table: "users", loginFields: ["email"] }
}; 

// Function to dynamically build and execute login query
const checkUserInTable = (role, identifier, password, callback) => {
    const rule = loginRules[role];
    if (!rule) return callback(new Error("Invalid role specified"), null);

    // Generate SQL conditions for login fields
    const conditions = rule.loginFields.map(field => `${field} = ?`).join(" OR ");
    const query = `SELECT * FROM ${rule.table} WHERE ${conditions} LIMIT 1`;
    const queryParams = Array(rule.loginFields.length).fill(identifier);

    // Log the query for debugging
    console.log(`Executing query on ${rule.table}: ${query}`);

    // Execute the query
    dbconnection.query(query, queryParams, (err, results) => {
        if (err) return callback(err, null);
        if (results.length === 0) return callback(null, null); // No user found

        const user = results[0];
        console.log(`User found in ${role}:`, user);

        // Compare the provided password with the hashed password stored in the DB
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) return callback(err, null);
            if (isMatch) return callback(null, user); // Password matches
            return callback(null, null); // Password doesn't match
        });
    });
};

// Function to create a new user in the specified role's table
const createUser = (role, identifier, hashedPassword, callback) => {
    const table = loginRules[role]?.table;
    if (!table) return callback(new Error("Invalid role specified"));

    const query = `INSERT INTO ${table} (${loginRules[role].loginFields[0]}, password) VALUES (?, ?)`;
    const queryParams = [identifier, hashedPassword];

    dbconnection.query(query, queryParams, (err, result) => {
        if (err) return callback(err);
        return callback(null, result);
    });
};

// Export the function for use in your controllers and routes 
module.exports = { checkUserInTable, createUser };



// const checkUserInDb = async (table, loginFields, loginData) => {
//     const loginField = loginFields[0]
//     const loginValue = loginData[loginField]
//     const query = `SELECT * FROM ${table} WHERE ${loginField} = ?`
//     return new Promise((resolve, reject) => {
//         dbconnection.query(query, [loginValue], (err, results) => {
//             if (err) {
//                 reject(err)
//             } else {
//                 resolve(results)
//             }
//         })
//     })
// }


// const loginRules = {
//  center_admin: {table: "center_admin", id: "center_admin_id", password: "password"},
//  gym_admins: {table: "gym_admins", id: "gym_admin_id", password: "password"},
//  users: {table: "users", id: "user_id", password: "password"}    
// }   


