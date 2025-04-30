const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');
const { deviceKardex } = require('../controllers/deviceKardexController');
const { deviceValidationRules } = require('../validators/deviceSchema');
const { validarCampos } = require('../middleware/carga');

router.post(
  '/',
  verifyToken,
  deviceValidationRules,
  validarCampos,
  deviceKardex
);

module.exports = router;
