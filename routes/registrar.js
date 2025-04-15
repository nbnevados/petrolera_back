const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth.js');
const { getConnection, sql } = require('../config/db');
const { v4: uuidv4 } = require('uuid');

const obtenerFechaSQL = () =>{
  const now = new Date();

  const pad = (num, size = 2) => String(num).padStart(size, '0');
  const milliseconds = String(now.getMilliseconds()).padStart(3, '0');

  const fechaSQL = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ` +
                   `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}.${milliseconds}`;

  return fechaSQL;
}

router.post('/', verifyToken, async (req, res) => {
  const uid = uuidv4();
  const { 
    autoriza, 
    combustible,
    consumidor,
    consumidorTipo,
    litros,
    patente,
    retira,
    user
  } = await req.body;

  const combData = {
    autoriza: (autoriza !== '') ? autoriza : 'N/A', 
    combustible,
    consumidor,
    consumidorTipo: (consumidorTipo !== '') ? consumidorTipo : 'N/A',
    litros,
    patente: (patente !== '') ? patente : 'N/A',
    retira,
    user,
    movimiento: 'S',
    uid,
    createdAt: obtenerFechaSQL()
  }

  if (!consumidor || !uid) {
    return res.status(400).json({ error: 'Faltan parámetros requeridos' });
  }

  console.log({combData});

  try {

    const pool = await getConnection();
    const result = await pool.request()
      .input('autoriza', sql.VarChar, combData.autoriza)
      .input('combustible', sql.TinyInt, combData.combustible)
      .input('consumidor', sql.TinyInt, combData.consumidor)
      .input('consumidorTipo', sql.VarChar, combData.consumidorTipo)
      .input('litros', sql.Real, combData.litros)
      .input('patente', sql.VarChar, combData.patente)
      .input('retira', sql.VarChar, combData.retira)
      .input('user', sql.SmallInt, combData.user)
      .input('movimiento', sql.Char(1), combData.movimiento)
      .input('uid', sql.VarChar, combData.uid)
      .input('createdAt', sql.DateTime, combData.createdAt)
      .query('INSERT INTO [Combustible].[dbo].[Kardex] (Autoriza, Combustible, ConsumidorTipo, Consumidor, Cantidad, Patente, Retira, TipoMovimiento, Entrega, UniqueID, Fecha) OUTPUT INSERTED.RowId VALUES (@autoriza, @combustible, @consumidor, @consumidorTipo, @litros, @patente, @retira, @movimiento, @user, @uid, @createdAt)');

    const nuevoRowId = result.recordset[0].RowId;

    res.status(200).json({
      message: 'Registro exitoso',
      rowId: nuevoRowId
    });

  } catch (err) {
    console.error('Error al autenticar al usuario:', err);
    res.status(500).json({ error: 'Error en la base de datos' });
  }
});

module.exports = router;
