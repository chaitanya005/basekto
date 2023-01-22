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
  getPublishedBasketsByUser,
  publishBasketRequest,
  getPublishBasketsRequest,
} = require('../controllers/basket');
var router = express.Router();

router.post('/basket/new', createBasket);
router.get('/baskets', getBaskets);
router.get('/baskets/:userAddress', getBasketsByUsers);
router.get('/basket/:id', getBasket);
router.post('/invest/new', investInBasket);
router.get('/invested-baskets/:userAddress', getInvestedBasketsByUser);
router.get('/investments/basket', getInvesmentsInBasketByUser);
router.post('/publish/request/new', publishBasketRequest);
router.get('/publish/requests', getPublishBasketsRequest);
router.get('/published/baskets', getPublishedBaskets);
router.get('/published/baskets/:userAddress', getPublishedBasketsByUser);
router.post('/publish/basket/new', publishBasket);

module.exports = router;
