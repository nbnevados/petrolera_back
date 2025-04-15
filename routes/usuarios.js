const express = require('express');
const router = express.Router();
const { getConnection, sql } = require('../config/db.js');

router.get('/:usuario', async (req, res) => {
  const usuario = req.params.usuario;
  if (!usuario) {
    return res.status(400).json({ error: 'Falta el parámetro "usuario"' });
  }
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input('usuario', sql.VarChar, usuario)
      .query('SELECT * FROM [Combustible].[dbo].[usuarios] WHERE Iniciales = @usuario');

    if (result.recordset.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.status(200).json({
      message: 'Login exitoso',
      user: result.recordset[0],
    });

  } catch (err) {
    console.error('Error en la operación:', err);
    res.status(500).json({ error: 'Error en la base de datos' });
  } finally {
    sql.close();
  }
});

module.exports = router;

