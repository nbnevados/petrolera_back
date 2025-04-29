const { body } = require('express-validator');

const sobranteValidationRules = [
  body('litros').isInt({ min: 1 }).withMessage('Litros debe ser un número positivo.'),
  body('carga_id').isInt({ min: 1 }).withMessage('Id de Carga debe ser un número positivo.'),
  body('evidencia').optional().isString().withMessage('Evidencia es nula.')
];

module.exports = { sobranteValidationRules };
