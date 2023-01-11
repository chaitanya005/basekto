const express = require('express');
const { getCoinPrice, getCoinGrowthRate } = require('../controllers/coinData');
const { getCoinsList } = require('../controllers/coins');
const router = express.Router();

router.get('/price', getCoinPrice);
router.get('/growth-rate', getCoinGrowthRate);
router.get('/coin-list', getCoinsList);

module.exports = router;
