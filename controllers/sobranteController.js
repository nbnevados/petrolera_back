const { getConnection, sql } = require('../config/db');

const crearSobrante = async (req, res) => {

  try {
    const { carga_id, evidencia, litros } = req.body;
  
    const pool = await getConnection();
    await pool.request()
    .input('carga_id', sql.Int, carga_id)
    .input('evidencia', sql.VarBinary, Buffer.from(evidencia, 'base64'))
    .input('litros', sql.Int, litros)
    .query('INSERT INTO [Combustible].[dbo].[Sobrante] (carga_id, evidencia, litros) VALUES (@carga_id, @evidencia, @litros)');

    res.status(201).json({
      message: 'Registro exitoso',
    });

  } catch (error) {
    console.error('Error en crearSobrante:', error);
    res.status(500).json({ error: 'Error en la base de datos' });
  }
};

module.exports = { crearSobrante };
