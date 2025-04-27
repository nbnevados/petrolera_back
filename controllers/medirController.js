const { getConnection, sql } = require('../config/db');
const { obtenerFechaSQL } = require('../helpers/date');

const registrarMedir = async (req, res) => {
  
  const dataBody = {
    ...req.body,
    fecha: obtenerFechaSQL(),
  }

  try {
    const pool = await getConnection();
    await pool.request()
      .input('cms', sql.Int, dataBody.cms)
      .input('fecha', sql.DateTime, dataBody.fecha)
      .input('bomba', sql.Int, dataBody.bomba)
      .input('usuario', sql.Int, dataBody.usuario)
      .query('INSERT INTO medir (id, vara) VALUES (@uuid, @vara)');
    
    return res.status(201).json({ message: 'Registro exitoso' });
  
  } catch (error) {
    console.error('Error al registrar la medida:', error);
    res.status(500).json({ message: 'Error al registrar la medida' });
  }
}

module.exports = { registrarMedir };