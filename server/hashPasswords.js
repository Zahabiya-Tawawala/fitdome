// tmeporary code to hash the passwords in case not hashed

const dbconnection = require("./config/db"); // Adjust path as needed
const bcrypt = require("bcryptjs");

const hashPasswords = async () => {
  try {
    // Fetch all users with plain-text passwords
    const [rows] = await dbconnection.promise().query("SELECT admin_id, admin_password FROM center_admin");

    for (const row of rows) {
      // Check if the password is already hashed
      if (!row.admin_password.startsWith("$2a$")) {
        // Hash the password
        const hashedPassword = await bcrypt.hash(row.admin_password, 10);

        // Update the user's password in the database
        await dbconnection.promise().query("UPDATE center_admin SET admin_password = ? WHERE admin_id = ?", [hashedPassword, row.admin_id]);
      }
    }
    console.log("Passwords hashed successfully!");
  } catch (error) {
    console.error("Error hashing passwords:", error);
  } finally {
    // Close the database connection if needed
    dbconnection.end();
  }
};

// Run the script
hashPasswords();

// // hashPasswords.js
// const dbconnection = require("./config/db"); // Update the path if needed
// const bcrypt = require("bcryptjs");

// const hashPasswords = async () => {
//   try {
//     // Fetch all users with plain-text passwords
//     const [rows] = await dbconnection.promise().query("SELECT id, gym_password FROM gym_admins");

//     for (const row of rows) {
//       // Check if the password is already hashed
//       if (!row.gym_password.startsWith("$2a$")) {
//         // Hash the password
//         const hashedPassword = await bcrypt.hash(row.gym_password, 10);

//         // Update the user's password in the database
//         await dbconnection.promise().query("UPDATE gym_admins SET gym_password = ? WHERE id = ?", [hashedPassword, row.id]);
//       }
//     }
//     console.log("Passwords hashed successfully!");
//   } catch (error) {
//     console.error("Error hashing passwords:", error);
//   } finally {
//     // Close the database connection if needed
//     dbconnection.end();
//   }
// };

// // Run the script
// hashPasswords();
