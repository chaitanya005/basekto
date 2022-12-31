var express = require('express');
const { getCoinsList } = require('../controllers/coins');
const {
  getDataPoints,
  storeOHLCDataToDB,
  getOHLCDataFromDB,
} = require('../controllers/graphDataPoints');
var router = express.Router();

router.post('/graph_data', getDataPoints);
router.get('/coins', getCoinsList);
router.get('/get-ohlc-data', getOHLCDataFromDB);
router.post('/store-coins', storeOHLCDataToDB);

module.exports = router;
