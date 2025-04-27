const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');
const { validateMedir } = require('../validators/medirSchema');

router.post('/', verifyToken, validateMedir, (req, res) => {
  res.json({ message: 'Medida registrada correctamente' });
});

module.exports = router;