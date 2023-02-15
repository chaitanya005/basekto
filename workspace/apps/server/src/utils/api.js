const { default: axios } = require('axios');
const Ohlc = require('../models/ohlcData');
const {
  getCoinPricesAndTimeStamps,
  formatPricesWithTimeStamps,
} = require('@basketo/web-utils');

const getGraphDataPts = async (basketData, days, isDBdata) => {
  let coinPrices = [],
    timeStamps;
  for (let i = 0; i < basketData.length; i++) {
    const graphData = await Ohlc.findOne({ coin: basketData[i].id });
    const { singleCoinClosePrices, timeStamp } = getCoinPricesAndTimeStamps(
      graphData,
      basketData[i]
    );

    coinPrices.push(singleCoinClosePrices);
    timeStamps = timeStamp;
  }

  const { formattedBasketPricesWithTimeStamp, totalGrowthRateOfbasket } =
    formatPricesWithTimeStamps(coinPrices, timeStamps);
  return { formattedBasketPricesWithTimeStamp, totalGrowthRateOfbasket };
};

const getOhlcData = (coin, days) =>
  axios.get(
    `https://api.coingecko.com/api/v3/coins/${coin.id}/ohlc?vs_currency=usd&days=${days}`
  );

module.exports = { getOhlcData, getGraphDataPts };
