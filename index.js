const express = require('express');
const cors = require('cors');
const login = require('./routes/login');
// const consumidores = require('./routes/consumidores');
// const consumidoresLista = require('./routes/consumidoresLista');
// const combustibles = require('./routes/combustibles');
const bombas = require('./routes/bombas');
const registrar = require('./routes/registrar');
const registrarDispositivo = require('./routes/registrarDispositivo');
const sql = require('mssql');

require('dotenv').config();

const app = express();

app.use(cors({
  origin: 'http://localhost:4200'
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/login', login);
app.use('/api/bombas', bombas);

app.use('/api/dispositivo', registrarDispositivo);

app.use('/api/registrar', registrar);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

process.on('SIGINT', async () => {
  console.log('Apagando servidor y cerrando conexión a DB...');
  await sql.close();
  process.exit();
});