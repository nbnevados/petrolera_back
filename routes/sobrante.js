const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth.js');
const { getConnection, sql } = require('../config/db');

router.post('/', verifyToken, async (req, res) => {
  
  const { carga_id, evidencia, litros } = req.body;
  
  if (!carga_id || !litros) {
    return res.status(400).json({ error: 'Faltan parámetros requeridos' });
  }

  try {

    const pool = await getConnection();
    const result = await pool.request()
    .input('carga_id', sql.Int, carga_id)
    .input('evidencia', sql.VarBinary, Buffer.from(evidencia, 'base64'))
    .input('litros', sql.Int, litros)
    .query('INSERT INTO [Combustible].[dbo].[Sobrante] (carga_id, evidencia, litros) VALUES (@carga_id, @evidencia, @litros)');
  
    res.status(200).json({
      message: result
    });

  } catch (err) {
    console.error('Error al autenticar al usuario:', err);
    res.status(500).json({ error: 'Error en la base de datos' });
  }
});

module.exports = router;