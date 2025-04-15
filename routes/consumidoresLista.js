const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth.js');
const { getConnection, sql } = require('../config/db.js');

router.get('/:type', verifyToken, async (req, res) => {
  const type = req.params.type;
  if (!type) {
    return res.status(400).json({ error: 'Falta un parámetro' });
  }
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input('type', sql.VarChar, type)
      .query('SELECT * FROM [Combustible].[dbo].[Consumidores] WHERE Tipo = @type');
    res.status(200).json({ data: result.recordset });

  } catch (err) {
    console.error('Error en la operación:', err);
    res.status(500).json({ error: 'Error en la base de datos' });
  }
});

module.exports = router;
