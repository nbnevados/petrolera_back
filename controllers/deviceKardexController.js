const { getConnection, sql } = require('../config/db');

const deviceKardex = async (req, res) => {

  try {
    const { id, cargaId } = req.body;
  
    const pool = await getConnection();
    await pool.request()
    .input('id', sql.Int, id)
    .input('cargaId', sql.Int, cargaId)
    .query('INSERT INTO [Combustible].[dbo].[DispositivoKardex] (ID, KardexID) VALUES (@id, @cargaId)');

    res.status(201).json({
      message: 'Registro exitoso',
    });

  } catch (error) {
    console.error('Error en deviceKardex:', error);
    res.status(500).json({ error: 'Error en la base de datos' });
  }
  
};

module.exports = { deviceKardex };
