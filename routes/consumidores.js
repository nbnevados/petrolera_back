const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth.js');
const { getConnection } = require('../config/db.js');

router.get('/', verifyToken, async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .query('SELECT * FROM [Combustible].[dbo].[TiposConsumidores]');
    res.status(200).json({ data: result.recordset });

  } catch (err) {
    console.error('Error en la operación:', err);
    res.status(500).json({ error: 'Error en la base de datos' });
  }
});

module.exports = router;
