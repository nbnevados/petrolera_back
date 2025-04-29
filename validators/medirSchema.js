const { body } = require('express-validator');

const medirValidationRules = [
  body('cms').isInt({ min: 1 }).withMessage('Centímetros debe ser un número positivo.'),
  body('bomba').isInt({ min: 1 }).withMessage('Bomba debe ser un número positivo.'),
  body('usuario').isInt({ min: 1 }).withMessage('Usuario debe ser un número positivo.')
];

module.exports = { medirValidationRules };