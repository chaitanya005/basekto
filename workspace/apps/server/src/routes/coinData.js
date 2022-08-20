const express = require('express');
const { getCoinPrice, getCoinGrowthRate } = require('../controllers/coinData');
const router = express.Router();

router.get('/price', getCoinPrice);
router.get('/growth-rate', getCoinGrowthRate);

module.exports = router;
