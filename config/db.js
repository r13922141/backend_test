require("dotenv").config();
const { Pool } = require("pg");
const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  });

const createTableQuery = `
  CREATE TABLE IF NOT EXISTS machines (
    name TEXT NOT NULL,
    unit INTEGER NOT NULL,
    IP TEXT NOT NULL,
    service TEXT NOT NULL
  );
`;
async function createTable() {
    try {
      const client = await pool.connect();
      await client.query(createTableQuery);
      console.log('Table "machines" created successfully.');
      client.release();
    } catch (err) {
      console.error('Error creating table:', err);
    }
  }
const dropTableQuery = `DROP TABLE IF EXISTS machines;`;

async function dropTable() {
  try {
    const client = await pool.connect(); // 連線
    await client.query(dropTableQuery); // 執行刪除
    console.log('Table "machines" deleted successfully.');
    client.release(); // 釋放
  } catch (err) {
    console.error('Error deleting table:', err);
  }
}
async function recreateTable() {
    try {
      // 先刪除
      await dropTable();
      console.log("Table deleted successfully.");
  
      // 重新創建資料表
      await createTable();
      console.log("Table created successfully.");
    } catch (error) {
      console.error("Error during table drop or create:", error);
    }
  }
module.exports = { pool, createTable, dropTable,recreateTable};