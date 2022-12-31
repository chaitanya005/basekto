const Basket = require('../models/basket');
const Ohlc = require('../models/ohlcData');
const {
  singleBasket,
  userBaskets,
  readBaskets,
  createNewBasket,
} = require('../utils/db');

const createBasket = async (req, res) => {
  try {
    const { accountId, name, description, symbol, coins } = req.body;
    const basket = createNewBasket(accountId, name, description, symbol, coins);
    await basket.save();
    res.send(basket);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

const getBasket = async (req, res) => {
  try {
    const basket = await singleBasket(req.params.id);
    res.send(basket);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

const getBasketsByUsers = async (req, res) => {
  try {
    const baskets = await userBaskets(req.params.userAddress);
    res.send(baskets);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

const getBaskets = async (req, res) => {
  try {
    const baskets = await readBaskets();
    const basketsWithGrowthRates = [];
    for (let basket of baskets) {
      const basketGrowthRate = await getGrowthRatePercentages(basket.coins);
      const addGrowthRates = basketGrowthRate.reduce(
        (a, b) => a + b.growthRate,
        0
      );
      const eachBasketWithGrowthRate = [
        { ...basket._doc, growthRate: addGrowthRates },
      ];
      basketsWithGrowthRates.push(eachBasketWithGrowthRate);
    }
    res.send({ baskets: basketsWithGrowthRates.flat() });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

const getGrowthRatePercentages = async (coins) => {
  const growthPercentageOfCoins = [];

  for (let i = 0; i < coins.length; i++) {
    const growthRateOfCoin = await Ohlc.findOne({ coin: coins[i].id });
    const firstVal = growthRateOfCoin?.data[0];
    const lastVal = growthRateOfCoin?.data[growthRateOfCoin?.data.length - 1];

    const growthRate =
      ((lastVal?.['4'] - firstVal?.['1']) * 100) / firstVal?.['1'];

    growthPercentageOfCoins.push({
      growthRate: (growthRate * coins[i].weight) / 100,
    });
  }

  return growthPercentageOfCoins;
};

module.exports = {
  createBasket,
  getBasket,
  getBaskets,
  getBasketsByUsers,
};
