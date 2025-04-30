const express = require('express');
const cors = require('cors');
const sql = require('mssql');
require('dotenv').config();
const serverless = require('serverless-http');

const login = require('./routes/login');

const bombas = require('./routes/bombas');
const registrarDispositivo = require('./routes/registrarDispositivo');
const dispositivoCarga = require('./routes/dispositivoCarga');
const dispositivoMedir = require('./routes/dispositivoMedir');
const dispositivoKardex = require('./routes/dispositivoKardex'); 


const medirRoutes = require('./routes/medir');
const cargaRoutes = require('./routes/registrar');
const sobranteRoutes = require('./routes/sobrante');



const app = express();

app.use(cors({
  origin: 'https://petrolera-front.vercel.app'
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/api/hello', (req, res) => {
  res.json({ mensaje: 'Hola desde Vercel!' });
});



app.use('/api/login', login);
app.use('/api/bombas', bombas);

app.use('/api/dispositivo', registrarDispositivo);
app.use('/api/dispositivo/carga', dispositivoCarga);
app.use('/api/dispositivo/medir', dispositivoMedir);
app.use('/api/dispositivo/kardex', dispositivoKardex);

app.use('/api/medir', medirRoutes);
app.use('/api/carga', cargaRoutes);
app.use('/api/sobrante', sobranteRoutes);

app.use((err, req, res, next) => {
  console.error('Error no manejado:', err);
  res.status(500).json({ error: 'Error interno del servidor' });
});


process.on('SIGINT', async () => {
  console.log('Apagando servidor y cerrando conexión a DB...');
  await sql.close();
  process.exit();
});


module.exports.handler = serverless(app);

