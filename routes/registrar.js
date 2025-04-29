const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');
const { crearCarga } = require('../controllers/cargaController');
const { cargaValidationRules } = require('../validators/cargaSchema');
const { validarCampos } = require('../middleware/carga');

router.post(
  '/',
  verifyToken,
  cargaValidationRules,
  validarCampos,
  crearCarga
);

module.exports = router;
