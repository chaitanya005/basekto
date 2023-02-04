const { default: axios } = require('axios');
const Ohlc = require('../models/ohlcData');

const getGraphDataPts = async (basketData, days, isDBdata) => {
  let coinPrices = [],
    timeStamps;
  for (let i = 0; i < basketData.length; i++) {
    const graphData = isDBdata
      ? await Ohlc.findOne({ coin: basketData[i].id })
      : await getOhlcData(basketData[i], days);
    let coinsObj = {
      [basketData[i].name]: graphData.data.map((item) => ({ ...item })),
    };
    const singleCoinClosePrices = coinsObj[basketData[i].name].map(
      (item) => (item['4'] * basketData[i].weight) / 100
    );
    coinPrices.push(singleCoinClosePrices);
    let timeStamp = coinsObj[basketData[i].name].map((item) => item['0']);
    timeStamps = timeStamp;
  }
  let sumOfPrices = (r, a) =>
    r.map((b, i) => {
      let num = a[i] + b;
      return Number(num.toFixed(5));
    });
  let totalBasketPrices = coinPrices.reduce(sumOfPrices);
  let formattedBasketPricesWithTimeStamp = [];
  const formatPricesWithTime = (coinPrices, timeStamps) => {
    coinPrices.map((coinPrice, i) => {
      let obj = {
        price: coinPrice,
        timeStamp: timeStamps[i],
      };
      formattedBasketPricesWithTimeStamp.push(obj);
    });
  };
  formatPricesWithTime(totalBasketPrices, timeStamps);
  formattedBasketPricesWithTimeStamp.pop();
  const currPoint =
    formattedBasketPricesWithTimeStamp[
      formattedBasketPricesWithTimeStamp.length - 1
    ].price;
  const pastPoint = formattedBasketPricesWithTimeStamp[0].price;
  const totalGrowthRateOfbasket = ((currPoint - pastPoint) / pastPoint) * 100;

  return { formattedBasketPricesWithTimeStamp, totalGrowthRateOfbasket };
};

const getOhlcData = (coin, days) =>
  axios.get(
    `https://api.coingecko.com/api/v3/coins/${coin.id}/ohlc?vs_currency=usd&days=${days}`
  );

module.exports = { getOhlcData, getGraphDataPts };
