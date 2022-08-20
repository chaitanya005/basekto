var express = require('express');
const {
  createBasket,
  getBasket,
  getBaskets,
} = require('../controllers/basket');
var router = express.Router();

router.post('/basket/new', createBasket);
router.get('/baskets', getBaskets);
router.get('/basket/:id', getBasket);

module.exports = router;
