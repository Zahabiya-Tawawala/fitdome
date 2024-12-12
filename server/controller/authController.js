// authCOntroller.js is a controller file that contains the functions for user authentication and registration. It uses the user model to interact with the database and generate JWT tokens for authenticated users.
// const express = require("express");
const { checkUserInAllTables, createUser , loginRules } = require("../models/userModel"); // assuming your model file is named 'user.js'
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

// Login function for authentication
const login = (req, res) => {
  const { identifier, password } = req.body;

  // Check if role and credentials are provided
  if (!identifier || !password) {
    return res
      .status(400)
      .json({ message: "Please provide email and password" });
  }

  // Call the model function to check the user in the specific role's table
  checkUserInAllTables(identifier, (err, user) => {
    if (err)
      return res.status(500).json({ message: "Database error", error: err });
    if (!user) return res.status(401).json({ message: "Invalid credentials" }); 
 
    console.log(`User found:`, user);  // Log the user object for debugging

    // Get the user's role from the user object and the role-specific password field and retrieve the passwd dynamically from the user object
    const { passwordField } = require("../models/userModel").loginRules[user.role];

    // Compare the provided password with the hashed password stored in the DB

    bcrypt.compare(password, user[passwordField], (err, isMatch) => {
      if (err)
        return res
          .status(500)
          .json({ message: "Error comparing passwords", error: err });
      if (!isMatch)
        return res.status(401).json({ message: "Invalid credentials" });
      // Generate a JWT token if authentication is successful
      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      // Send the token to the client
      res.status(200).json({ message: "Login successful", token });
    });
  });
};

// Optional: Register function for creating new users
const register = (req, res) => {
  const { role, identifier, password, username, gymDocuments } = req.body;

  // Allow only 'users' and 'gym_admins' roles to register
  if (role !== "users" && role !== "gym_admins") {
    return res
      .status(403)
      .json({ message: "Registration not allowed for center admin role" });
  }
  // Ensure required fields are provided
  if (!role || !identifier || !password || !username) {
    return res.status(400).json({
      message: "Please provide role, identifier, password and username",
    });
  }

  // Check if the user already exists in the database
  checkUserInTable(role, identifier, password, (err, userExists) => {
    if (err)
      return res.status(500).json({ message: "Database error", error: err });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    // Hash the password before saving
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err)
        return res
          .status(500)
          .json({ message: "Error hashing password", error: err });

      // Save the new user to the database (assuming a `createUser` function in your model)

      // Use the createUser function to add the new user to the database
      createUser(
        role,
        identifier,
        hashedPassword,
        username,
        gymDocuments,
        (err, result) => {
          if (err)
            return res
              .status(500)
              .json({ message: "Database error", error: err });
          res.status(201).json({ message: "User registered successfully" });
        }
      );
    });
  });

  //   if(user){
  //     return res.status(400).json({ message: "User already exists" });
  //   }
  // Hash the password before saving
  //   bcrypt.hash(password, 10, (err, hashedPassword) => {
  //     if (err)
  //       return res
  //         .status(500)
  //         .json({ message: "Error hashing password", error: err });

  //     // Save the new user to the database (assuming a `createUser` function in your model)

  //     // Use the createUser function to add the new user to the database
  //     createUser(role, identifier, hashedPassword, username, (err, result) => {
  //       if (err)
  //         return res.status(500).json({ message: "Database error", error: err });
  //       res.status(201).json({ message: "User registered successfully" });
  //     });

  //     // const table = loginRules[role]?.table;
  //     // if (!table) return res.status(400).json({ message: "Invalid role specified" });

  //     // const query = `INSERT INTO ${table} (${loginRules[role].loginFields[0]}, password) VALUES (?, ?)`;
  //     // dbconnection.query(query, [identifier, hashedPassword], (err, result) => {
  //     //     if (err) return res.status(500).json({ message: "Database error", error: err });
  //     //     res.status(201).json({ message: "User registered successfully" });
  //     // });
  //   });
};

// Exporting the controller functions for use in routes
module.exports = {
  login,
  register,
};
