const { getConnection, sql } = require('../config/db');

const deviceMedir = async (req, res) => {

  try {
    const { id, cargaId } = req.body;
  
    const pool = await getConnection();
    await pool.request()
    .input('id', sql.Int, id)
    .input('cargaId', sql.Int, cargaId)
    .query('INSERT INTO [Combustible].[dbo].[DispositivoMediciones] (ID, MedicionesID) VALUES (@id, @cargaId)');

    res.status(201).json({
      message: 'Registro exitoso',
    });

  } catch (error) {
    console.error('Error en deviceMedir:', error);
    res.status(500).json({ error: 'Error en la base de datos' });
  }
  
};

module.exports = { deviceMedir };
