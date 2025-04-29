const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');
const { medirValidationRules } = require('../validators/medirSchema');
const { validarCampos } = require('../middleware/carga');
const { registrarMedir } = require('../controllers/medirController');

router.post(
  '/', 
  verifyToken,
  medirValidationRules,
  validarCampos,
  registrarMedir
);

module.exports = router;