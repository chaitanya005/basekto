var express = require('express');
const {
  createBasket,
  getBasket,
  getBaskets,
  getBasketsByUsers,
  investInBasket,
  getInvesmentsInBasketByUser,
  getInvestedBasketsByUser,
  publishBasket,
  getPublishedBaskets,
} = require('../controllers/basket');
var router = express.Router();

router.post('/basket/new', createBasket);
router.get('/baskets', getBaskets);
router.get('/baskets/:userAddress', getBasketsByUsers);
router.get('/basket/:id', getBasket);
router.post('/invest/new', investInBasket);
router.get('/invested-baskets/:userAddress', getInvestedBasketsByUser);
router.get('/investments/basket', getInvesmentsInBasketByUser);
router.post('/basket/publish', publishBasket);
router.get('/published/baskets', getPublishedBaskets);

module.exports = router;
