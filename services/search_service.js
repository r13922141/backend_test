const { pool } = require("../config/db");
exports.searchMachine= async (keyword) => {
  try {
    const query = `SELECT * FROM machines WHERE name ILIKE $1 OR service ILIKE $1 LIMIT 10`;
    const values = [`%${keyword}%`];
    const result = await pool.query(query, values);
    return result.rows;
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};