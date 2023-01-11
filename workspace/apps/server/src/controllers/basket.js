const Ohlc = require('../models/ohlcData');
const {
  singleBasket,
  userBaskets,
  readBaskets,
  createNewBasket,
  userInvestedBaskets,
  userInvestmentsInBasket,
  createNewInvestment,
  findBasketById,
  createPublishBasket,
  updateBasketWithPublishId,
  readPublishedBaskets,
} = require('../utils/db');

const createBasket = async (req, res) => {
  try {
    const { accountId, name, description, symbol, coins, _id } = req.body;
    const basket = createNewBasket(
      accountId,
      name,
      description,
      symbol,
      coins,
      _id
    );
    await basket.save();
    res.send(basket);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

const investInBasket = async (req, res) => {
  const { basketId, userAddress, coins, amount } = req.body.data;
  try {
    const basket = createNewInvestment(basketId, userAddress, coins, amount);
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
    const growthRateForEachCoin = await getGrowthRatePercentages(basket.coins);
    res.send(basket);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

const getBasketsByUsers = async (req, res) => {
  try {
    const baskets = await userBaskets(req.params.userAddress);
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

const getInvestedBasketsByUser = async (req, res) => {
  try {
    const { userAddress } = req.params;
    const investedBaskets = await userInvestedBaskets(userAddress);
    res.json(investedBaskets);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};

const getInvesmentsInBasketByUser = async (req, res) => {
  try {
    const { userAddress, basketId } = req.query;
    const invesmentsInBasketByUser = await userInvestmentsInBasket(
      userAddress,
      basketId
    );
    res.json(invesmentsInBasketByUser);
  } catch (err) {
    console.log(err);
    res.json(err);
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

const publishBasket = async (req, res) => {
  try {
    const { userAddress, basketId } = req.body;
    const basket = await findBasketById(basketId);
    if (!basket.publishedBasket) {
      if (userAddress == basket.accountId) {
        const newPublishedBasket = createPublishBasket(userAddress, basketId);
        await newPublishedBasket.save();
        await updateBasketWithPublishId(basketId, newPublishedBasket);
        res.send(newPublishedBasket);
      } else {
        res
          .status(400)
          .json({ status: 'failure', msg: 'Invalid UserAddress!' });
      }
    } else {
      res.send({ message: 'This Basket is already Published!' });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

const getPublishedBaskets = async (req, res) => {
  try {
    const publishedBaskets = await readPublishedBaskets();
    const basketsWithGrowthRates = [];
    for (let basket of publishedBaskets) {
      const basketGrowthRate = await getGrowthRatePercentages(basket.coins);
      const addGrowthRates = basketGrowthRate.reduce(
        (a, b) => a + b.growthRate,
        0
      );
      const eachBasketWithGrowthRate = [
        { ...basket, growthRate: addGrowthRates },
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
  investInBasket,
  getInvestedBasketsByUser,
  getInvesmentsInBasketByUser,
  publishBasket,
  getPublishedBaskets,
};
