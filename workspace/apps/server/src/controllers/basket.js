const Ohlc = require('../models/ohlcData');
const { getGraphDataPts } = require('../utils/api');
const {
  singleBasket,
  userBaskets,
  readBaskets,
  createNewBasket,
  userInvestedBaskets,
  userInvestmentsInBasket,
  createNewInvestment,
  findBasketById,
  updateBasketWithPublishId,
  readPublishedBaskets,
  createPublishBasketRequest,
  findPublishRequestByBasketId,
  publishBasketsByUser,
  readPublishedBasketRequests,
  readPublishedBasketRequestsData,
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
    res.send({ basketDetails: basket });
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
      const { formattedBasketPricesWithTimeStamp, totalGrowthRateOfbasket } =
        await getGraphDataPts(basket.coins, '', (isDBdata = true));
      const eachBasketWithGrowthRate = [
        {
          ...basket._doc,
          growthRate: totalGrowthRateOfbasket,
          graphData: formattedBasketPricesWithTimeStamp,
        },
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
    const basketsWithGrowthRates = [];
    for (let basket of investedBaskets) {
      const { formattedBasketPricesWithTimeStamp, totalGrowthRateOfbasket } =
        await getGraphDataPts(basket.coins, '', (isDBdata = true));
      const eachBasketWithGrowthRate = [
        {
          ...basket,
          growthRate: totalGrowthRateOfbasket,
          graphData: formattedBasketPricesWithTimeStamp,
        },
      ];
      basketsWithGrowthRates.push(eachBasketWithGrowthRate);
    }
    res.json({ baskets: basketsWithGrowthRates.flat() });
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
      const { formattedBasketPricesWithTimeStamp, totalGrowthRateOfbasket } =
        await getGraphDataPts(basket.coins, '', (isDBdata = true));
      const eachBasketWithGrowthRate = [
        {
          ...basket._doc,
          growthRate: totalGrowthRateOfbasket,
          graphData: formattedBasketPricesWithTimeStamp,
        },
      ];
      basketsWithGrowthRates.push(eachBasketWithGrowthRate);
    }
    res.send({ baskets: basketsWithGrowthRates.flat() });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

const publishBasketRequest = async (req, res) => {
  try {
    const { userAddress, basketId } = req.body;
    const basket = await findBasketById(basketId);
    const publishRequest = await findPublishRequestByBasketId(basketId);
    if (!publishRequest?.basketId) {
      if (userAddress == basket.accountId) {
        const newPublishedBasket = createPublishBasketRequest(
          userAddress,
          basketId
        );
        await newPublishedBasket.save();
        res.json({
          message:
            'Thank you for raising a request. Please be patient until we process!',
        });
      } else {
        res
          .status(400)
          .json({ status: 'failure', msg: 'Invalid UserAddress!' });
      }
    } else {
      res.status(400).send({
        message: "We've processing your request! Thanks for your patience",
      });
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
      const { formattedBasketPricesWithTimeStamp, totalGrowthRateOfbasket } =
        await getGraphDataPts(basket.coins, '', (isDBdata = true));
      const eachBasketWithGrowthRate = [
        {
          ...basket,
          growthRate: totalGrowthRateOfbasket,
          graphData: formattedBasketPricesWithTimeStamp,
        },
      ];
      basketsWithGrowthRates.push(eachBasketWithGrowthRate);
    }
    res.send({ baskets: basketsWithGrowthRates.flat() });
  } catch (err) {
    console.log('/getPublishedBaskets', err);
    res.status(400).json(err);
  }
};

const getPublishedBasketsByUser = async (req, res) => {
  try {
    const { userAddress } = req.params;
    const publishedBasketsByUser = await publishBasketsByUser(userAddress);
    const basketsWithGrowthRates = [];
    for (let basket of publishedBasketsByUser) {
      const { formattedBasketPricesWithTimeStamp, totalGrowthRateOfbasket } =
        await getGraphDataPts(basket.coins, '', (isDBdata = true));
      const eachBasketWithGrowthRate = [
        {
          ...basket._doc,
          growthRate: totalGrowthRateOfbasket,
          graphData: formattedBasketPricesWithTimeStamp,
        },
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
    const { basketId } = req.body;
    const publishRequest = await findPublishRequestByBasketId(basketId);
    const basket = await findBasketById(basketId);
    if (!basket.publishedBasket) {
      await updateBasketWithPublishId(basketId, publishRequest);
      res.json({ message: 'Successfully Published!' });
    } else {
      res.status(400).send({ message: 'This Basket is already Published!' });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

const getPublishBasketsRequest = async (req, res) => {
  try {
    const publishRequests = await readPublishedBasketRequests();
    const basketIds = [];
    for (let i of publishRequests) {
      basketIds.push(i.basketId);
    }
    const baskets = await readPublishedBasketRequestsData(basketIds);
    res.json(baskets);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

// const getGrowthRatePercentages = async (coins) => {
//   const growthPercentageOfCoins = [];
//   for (let i = 0; i < coins.length; i++) {
//     const growthRateOfCoin = await Ohlc.findOne({ coin: coins[i].id });
//     const firstVal = growthRateOfCoin?.data[0];
//     const lastVal = growthRateOfCoin?.data[growthRateOfCoin?.data.length - 1];

//     const growthRate =
//       ((lastVal?.['4'] - firstVal?.['1']) * 100) / firstVal?.['1'];

//     growthPercentageOfCoins.push({
//       growthRate: (growthRate * coins[i].weight) / 100,
//     });
//   }

//   return growthPercentageOfCoins;
// };

const getGrowthRatePercentages = async (coins) => {
  const basketCoinsPrice = [];
  for (let i = 0; i < coins.length; i++) {
    const coinPrices = await Ohlc.findOne({ coin: coins[i].id });
    const pastValWithWeight = (coinPrices?.data[0][4] * coins[i].weight) / 100;
    const currValWithWeight =
      (coinPrices?.data[coinPrices?.data.length - 2][4] * coins[i].weight) /
      100;
    basketCoinsPrice.push([pastValWithWeight, currValWithWeight]);
  }

  const SumOfPrices = basketCoinsPrice.reduce((arr, arr2) =>
    arr.map((a, i) => {
      let num = arr2[i] + a;
      return Number(num.toFixed(5));
    })
  );

  const totalGrowthRateOfBasket =
    ((SumOfPrices[1] - SumOfPrices[0]) / SumOfPrices[0]) * 100;
  return totalGrowthRateOfBasket;
};

const getGraphDataOfBasket = async (coins) => {
  let growthRatePercentage = [],
    timeStamp;
  for (let i = 0; i < coins.length; i++) {
    const growthRateOfCoin = await Ohlc.findOne({ coin: coins[i].id });
    let coinsObj = {
      [coins[i].name]: growthRateOfCoin.data.map((item) => ({ ...item })),
    };

    let growthRate = coinsObj[coins[i].name].map(
      (item) =>
        ((((item['4'] - item['1']) * 100) / item['1']) * [coins[i].weight]) /
        100
    );
    let timeStamps = coinsObj[coins[i].name].map((item) => item['0']);
    timeStamp = timeStamps;
    growthRatePercentage.push(growthRate);
  }

  let sum = (r, a) =>
    r.map((b, i) => {
      let num = a[i] + b;
      return Number(num.toFixed(5));
    });
  let totalGrowthRates = growthRatePercentage.reduce(sum);
  let formattedGrowthRatesWithTimeStamp = [];
  const data = (a1, a2) =>
    a1.map((a, i) => {
      let obj = {
        'Growth Rate': a,
        // timeStamp: moment(a2[i]).format('MMM Do YY - hh:mm a'),
        timeStamp: a2[i],
      };
      formattedGrowthRatesWithTimeStamp.push(obj);
    });
  data(totalGrowthRates, timeStamp);
  formattedGrowthRatesWithTimeStamp.pop();
  const totalGrowthRateOfbasket =
    formattedGrowthRatesWithTimeStamp[
      formattedGrowthRatesWithTimeStamp.length - 1
    ]['Growth Rate'] - formattedGrowthRatesWithTimeStamp[0]['Growth Rate'];
  return { formattedGrowthRatesWithTimeStamp, totalGrowthRateOfbasket };
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
  getPublishedBasketsByUser,
  publishBasketRequest,
  getPublishBasketsRequest,
};
