const { getConnection, sql } = require('../config/db');


const crearSobrante = async (req, res) => {
  try {
    const { carga_id, evidencia, litros } = req.body;

    const combData = {
      carga_id,
      evidencia,
      litros
    };

    const pool = await getConnection();
    const result = await pool.request()
      .input('carga_id', sql.Int, combData.carga_id)
      .input('evidencia', sql.VarBinary, combData.evidencia)
      .input('litros', sql.Int, combData.litros)
      .query(`
        INSERT INTO [Combustible].[dbo].[Sobrante] 
          (carga_id, evidencia, litros) 
        OUTPUT INSERTED.RowId 
        VALUES (@carga_id, @evidencia, @litros)
      `);

    const nuevoRowId = result.recordset[0].RowId;

    res.status(201).json({
      message: 'Registro exitoso',
      rowId: nuevoRowId
    });

  } catch (error) {
    console.error('Error en crearSobrante:', error);
    res.status(500).json({ error: 'Error en la base de datos' });
  }
};

module.exports = {
  crearSobrante
};
