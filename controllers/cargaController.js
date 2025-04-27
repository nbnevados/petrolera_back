const { getConnection, sql } = require('../config/db');
const { obtenerFechaSQL } = require('../helpers/date');

const crearCarga = async (req, res) => {
  try {
    const { litros, sobra, factura, bomba, evidencia, user } = req.body;

    const combData = {
      litros,
      sobra: sobra ? 1 : 0,
      factura,
      bomba,
      user,
      createdAt: obtenerFechaSQL()
    };

    const pool = await getConnection();
    const result = await pool.request()
      .input('litros', sql.Int, combData.litros)
      .input('sobra', sql.Bit, combData.sobra)
      .input('factura', sql.VarChar, combData.factura)
      .input('bomba', sql.TinyInt, combData.bomba)
      .input('user', sql.Int, combData.user)
      .input('createdAt', sql.DateTime, combData.createdAt)
      .query(`
        INSERT INTO [Combustible].[dbo].[Carga] 
          (Litros, Sobra, Factura, Bomba, Usuario, Fecha) 
        OUTPUT INSERTED.RowId 
        VALUES (@litros, @sobra, @factura, @bomba, @user, @createdAt)
      `);

    const nuevoRowId = result.recordset[0].RowId;

    res.status(201).json({
      message: 'Registro exitoso',
      rowId: nuevoRowId
    });

  } catch (error) {
    console.error('Error en crearCarga:', error);
    res.status(500).json({ error: 'Error en la base de datos' });
  }
};

module.exports = {
  crearCarga
};
