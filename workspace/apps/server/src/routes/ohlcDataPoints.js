var express = require('express');
const { getCoinsList } = require('../controllers/coins');
const { getDataPoints } = require('../controllers/graphDataPoints');
var router = express.Router();

router.post('/graph_data', getDataPoints);
router.get('/coins', getCoinsList);

module.exports = router;
