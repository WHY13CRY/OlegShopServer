const pool = require('../config/db');

const searchItem = async (query) => {
  const result = await pool.query(
    `SELECT * FROM products WHERE LOWER(name) LIKE LOWER($1) OR LOWER(description) LIKE LOWER($1)`,
    [`%${query}%`],
  );
  return result.rows;
};

module.exports = { searchItem };
