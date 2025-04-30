const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');
const { deviceCarga } = require('../controllers/deviceCargaController');
const { deviceValidationRules } = require('../validators/deviceSchema');
const { validarCampos } = require('../middleware/carga');

router.post(
  '/',
  verifyToken,
  deviceValidationRules,
  validarCampos,
  deviceCarga
);

module.exports = router;
