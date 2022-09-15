var express = require('express');
const {
  createBasket,
  getBasket,
  getBaskets,
  getBasketsByUsers
} = require('../controllers/basket');
var router = express.Router();

router.post('/basket/new', createBasket);
router.get('/baskets', getBaskets);
router.get('/baskets/:userAddress', getBasketsByUsers);
router.get('/basket/:id', getBasket);

module.exports = router;
