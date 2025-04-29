const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth.js');
const { getConnection, sql } = require('../config/db');

router.post('/', verifyToken, async (req, res) => {
  const { 
    rowId, 
    descDispositivo,
    tipoConexion
  } = await req.body;

  if (!rowId || !tipoConexion) {
    return res.status(400).json({ error: 'Faltan parámetros requeridos' });
  }

  try {

    const pool = await getConnection();
    const result = await pool.request()
      .input('rowId', sql.Int, rowId)
      .input('descDispositivo', sql.VarChar, descDispositivo)
      .input('tipoConexion', sql.VarChar, tipoConexion)
      .query('INSERT INTO [Combustible].[dbo].[Dispositivos] (ID, DescDispositivo, TipoConexion) VALUES (@rowId, @descDispositivo, @tipoConexion)');

    res.status(200).json({
      message: result,
      result: res
    });

  } catch (err) {
    console.error('Error al autenticar al usuario:', err);
    res.status(500).json({ error: 'Error en la base de datos' });
  }
});

module.exports = router;
