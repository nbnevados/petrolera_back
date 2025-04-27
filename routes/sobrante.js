const express = require('express');
const router = express.Router();
const { crearSobrante } = require('../controllers/sobranteController');
const { sobranteValidationRules } = require('../validators/sobranteSchema');
const { validarCampos } = require('../middleware/carga');
const verifyToken = require('../middleware/auth');

router.post(
  '/',
  verifyToken,
  sobranteValidationRules,
  validarCampos,
  crearSobrante
);

module.exports = router;
