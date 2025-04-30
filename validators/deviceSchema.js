const { body } = require('express-validator');

const deviceValidationRules = [
  body('id').isInt({ min: 1 }).withMessage('ID del dispositivo debe ser un número positivo.'),
  body('cargaId').isInt({ min: 1 }).withMessage('ID de la Carga debe ser un número positivo.'),
];

module.exports = { deviceValidationRules };
