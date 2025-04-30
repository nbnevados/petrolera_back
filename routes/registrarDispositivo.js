const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth.js');
const { getConnection, sql } = require('../config/db');

router.post('/', verifyToken, async (req, res) => {
  const { 
    descDispositivo,
    tipoConexion
  } = await req.body;

  if (!descDispositivo || !tipoConexion) {
    return res.status(400).json({ error: 'Faltan parámetros requeridos' });
  }

  try {

    const pool = await getConnection();
    const result = await pool.request()
      .input('descDispositivo', sql.VarChar, descDispositivo)
      .input('tipoConexion', sql.VarChar, tipoConexion)
      .query('INSERT INTO [Combustible].[dbo].[Dispositivos] (DescDispositivo, TipoConexion) OUTPUT INSERTED.ID VALUES (@descDispositivo, @tipoConexion)');

      const nuevoRowId = result.recordset[0].ID;

      res.status(201).json({
        message: 'Registro exitoso',
        rowId: nuevoRowId
      });

  } catch (err) {
    console.error('Error al autenticar al usuario:', err);
    res.status(500).json({ error: 'Error en la base de datos' });
  }
});

module.exports = router;
