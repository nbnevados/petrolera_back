const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');
const { deviceMedir } = require('../controllers/deviceMedirController');
const { deviceValidationRules } = require('../validators/deviceSchema');
const { validarCampos } = require('../middleware/carga');

router.post(
  '/',
  verifyToken,
  deviceValidationRules,
  validarCampos,
  deviceMedir
);

module.exports = router;
