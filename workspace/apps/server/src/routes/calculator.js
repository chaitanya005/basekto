const express = require('express');
const { calculate } = require('../controllers/calculator');
const router = express.Router();

router.get('/calculate', calculate);

module.exports = router;
