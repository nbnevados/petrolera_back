const express = require('express');
const cors = require('cors');
const login = require('./routes/login');

const bombas = require('./routes/bombas');
const registrarDispositivo = require('./routes/registrarDispositivo');
const sql = require('mssql');

const medirRoutes = require('./routes/medir');
const cargaRoutes = require('./routes/registrar');
const sobranteRoutes = require('./routes/sobrante');

require('dotenv').config();

const app = express();

app.use(cors({
  origin: 'http://localhost:4200'
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/login', login);
app.use('/api/bombas', bombas);

app.use('/api/medir', medirRoutes);
app.use('/api/dispositivo', registrarDispositivo);

app.use('/api/carga', cargaRoutes);
app.use('/api/sobrante', sobranteRoutes);

app.use((err, req, res, next) => {
  console.error('Error no manejado:', err);
  res.status(500).json({ error: 'Error interno del servidor' });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

process.on('SIGINT', async () => {
  console.log('Apagando servidor y cerrando conexión a DB...');
  await sql.close();
  process.exit();
});