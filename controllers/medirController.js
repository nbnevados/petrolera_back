const { getConnection, sql } = require('../config/db');
const { obtenerFechaSQL } = require('../helpers/date');

const registrarMedir = async (req, res) => {
  
  const dataBody = {
    cms: req.body.cms,
    bomba: req.body.bomba,
    usuario: req.body.usuario,
    fecha: obtenerFechaSQL(),
  }

  try {
    const pool = await getConnection();
    await pool.request()
      .input('cms', sql.Int, dataBody.cms)
      .input('fecha', sql.DateTime, dataBody.fecha)
      .input('bomba', sql.TinyInt, dataBody.bomba)
      .input('usuario', sql.Int, dataBody.usuario)
      .query('INSERT INTO [Combustible].[dbo].[Mediciones] (Cms, Fecha, Bomba, Usuario) VALUES (@cms, @fecha, @bomba, @usuario)');
    
    return res.status(201).json({ message: 'Registro exitoso' });
  
  } catch (error) {
    console.error('Error al registrar la medida:', error);
    res.status(500).json({ message: 'Error al registrar la medida' });
  }
}

module.exports = { registrarMedir };