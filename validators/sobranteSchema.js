const { body } = require('express-validator');

const sobranteValidationRules = [
  body('carga_id').isInt({ min: 1 }).withMessage('Id de Carga debe ser un número positivo.'),
  body('evidencia').notEmpty().withMessage('Evidencia es obligatoria.'),
  body('litros').isInt({ min: 1 }).withMessage('Litros debe ser un número válido.'),
];

module.exports = { sobranteValidationRules };
