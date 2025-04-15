const sql = require('mssql');
require('dotenv').config();

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  port: parseInt(process.env.DB_PORT, 10),
  database: process.env.DB_NAME,
  options: {
    encrypt: process.env.DB_ENCRYPT === 'true',
    enableArithAbort: true,
    trustServerCertificate: true,
  }
};

const getConnection = async () => {
  try {
    const pool = await sql.connect(dbConfig);
    if (!pool) {
      pool = await sql.connect(dbConfig);
    } else if (!pool.connected) {
      pool = await sql.connect(dbConfig); // si por alguna razón se desconectó
    }
    return pool;
  } catch (err) {
    console.error('Error conectando a la base de datos:', err);
    throw err;
  }
};

module.exports = {
  getConnection,
  sql
};