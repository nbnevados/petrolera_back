const { body } = require('express-validator');

const cargaValidationRules = [
  body('litros').isInt({ min: 1 }).withMessage('Litros debe ser un número positivo.'),
  body('sobra').isBoolean().withMessage('Sobra debe ser booleano.'),
  body('factura').optional().isString().withMessage('Factura debe ser un texto.'),
  body('bomba').isInt({ min: 1 }).withMessage('Bomba debe ser un número válido.'),
  body('user').isInt({ min: 1 }).withMessage('Usuario debe ser un número válido.')
];

module.exports = { cargaValidationRules };
