const db = require("./config/db"); // Adjust the path to your DB config
const bcrypt = require("bcryptjs");

const hashAndUpdatePasswords = async () => {
  try {
    const pool = await db(); // Get database connection

    // Define the tables and their respective password columns
    const tables = [
      { name: "center_admin", emailColumn: "admin_gmail", passwordColumn: "admin_password" },
      { name: "gym_admins", emailColumn: "gym_email", passwordColumn: "gym_password" },
      { name: "users", emailColumn: "email", passwordColumn: "password" },
    ];

    for (const table of tables) {
      console.log(`Processing table: ${table.name}`);

      // Fetch users with plain-text passwords
      const [rows] = await pool.query(
        `SELECT id, ${table.passwordColumn} AS password FROM ${table.name}`
      );

      for (const row of rows) {
        if (!row.password || row.password.startsWith("$2a$")) {
          // Skip if password is already hashed (bcrypt hashes start with "$2a$")
          console.log(`Skipping user ID ${row.id} in ${table.name}`);
          continue;
        }

        // Hash the plain-text password
        const hashedPassword = await bcrypt.hash(row.password, 10);

        // Update the hashed password in the database
        await pool.query(
          `UPDATE ${table.name} SET ${table.passwordColumn} = ? WHERE id = ?`,
          [hashedPassword, row.id]
        );

        console.log(`Updated password for user ID ${row.id} in ${table.name}`);
      }
    }

    console.log("Password hashing and updates completed!");
  } catch (error) {
    console.error(`Error hashing passwords: ${error.message}`);
  }
};

hashAndUpdatePasswords();
