const { default: axios } = require('axios');
const Basket = require('../models/basket');
const { singleBasket } = require('../utils/db');

const createBasket = async (req, res) => {
  try {
    const { accountId, name, description, symbol, coins } = req.body;
    const basket = new Basket({
      accountId: accountId,
      name: name,
      description: description,
      symbol: symbol,
      coins: coins,
    });
    await basket.save();
    res.send(basket);
  } catch (err) {
    res.status(400).json(err);
  }
};

const getBasket = async (req, res) => {
  try {
    const basket = await singleBasket(req.params.id);
    res.send(basket);
  } catch (err) {
    res.status(400).json(err);
  }
};

const getBaskets = async (req, res) => {
  try {
    const baskets = await Basket.find();
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
    res.status(400).json(err);
  }
};

const getGrowthRatePercentages = async (coins) => {
  const growthPercentageOfCoins = [];

  for (let i = 0; i < coins.length; i++) {
    const growthRateOfCoin = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${
        coins[i].id
      }/ohlc?vs_currency=usd&days=${7}`
    );

    const firstVal = growthRateOfCoin.data[0];
    const lastVal = growthRateOfCoin.data[growthRateOfCoin.data.length - 1];

    const growthRate = ((lastVal['4'] - firstVal['1']) * 100) / firstVal['1'];

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
};
