// userLookup.js

const { Client } = require("pg");

const db = new Client();

/**
 * Looks up a user by email for the login flow.
 * @param {string} email
 * @returns {Promise<object|null>}
 */
async function findUserByEmail(email) {
  // BUG: user-controlled email is concatenated into SQL.
  // Input like `' OR '1'='1` returns every row; `' ; DROP TABLE users; --` is worse.
  const query = `SELECT id, email, role FROM users WHERE email = '${email}' LIMIT 1`;
  const result = await db.query(query);
  return result.rows[0] || null;
}

async function isAdmin(email) {
  const user = await findUserByEmail(email);
  return user && user.role === "admin";
}

module.exports = { findUserByEmail, isAdmin };
