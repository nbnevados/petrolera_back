const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { getConnection, sql } = require('../config/db');

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_TIME = process.env.JWT_TIME;
router.post('/', async (req, res) => {

  const {user, pass } = await req.body;

  if (!user || !pass) {
    return res.status(400).json({ error: 'Faltan parámetros como "usuario" o "contraseña"' });
  }

  try {

    const pool = await getConnection();
    const result = await pool.request()
      .input('user', sql.VarChar, user)
      .input('pass', sql.VarBinary(100), Buffer.from(pass.slice(2), 'hex'))
      .query('SELECT * FROM [Combustible].[dbo].[usuarios] WHERE Iniciales = @user AND Acceso = @pass');

    if (result.recordset.length === 0) {
      return res.status(401).json({ 
        error: 'Su usuario o contraseña son incorrectos'
      });
    }

    const userInfo = result.recordset[0];
    const token = jwt.sign(
      {
        id: userInfo.ID,
        user: userInfo.Iniciales
      },
      JWT_SECRET,
      {
        expiresIn: JWT_TIME
      }
    );

    res.status(200).json({
      message: 'Login exitoso',
      user: result.recordset[0].Clave,
      origin: result.recordset[0].Origen,
      name: result.recordset[0].nombre,
      token
    });

  } catch (err) {
    console.error('Error al autenticar al usuario:', err);
    res.status(500).json({ error: 'Error en la base de datos' });
  }
});

module.exports = router;
