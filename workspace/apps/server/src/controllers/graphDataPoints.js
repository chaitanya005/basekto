const { default: axios } = require('axios');
const moment = require('moment');
const { coinsData } = require('../coins');
const Ohlc = require('../models/ohlcData');
const { getOhlcData } = require('../utils/api');

async function getDataPoints(req, res) {
  try {
    const { basketData, days } = req.body;
    let growthRatePercentage = [],
      timeStamp;
    const growthPercentageOfCoins = [];
    for (let i = 0; i < basketData.length; i++) {
      const graphData = await getOhlcData(basketData[i], days);
      let coinsObj = {
        [basketData[i].name]: graphData.data.map((item) => ({ ...item })),
      };

      let growthRate = coinsObj[basketData[i].name].map(
        (item) =>
          ((((item['4'] - item['1']) * 100) / item['1']) *
            [basketData[i].weight]) /
          100
      );
      let timeStamps = coinsObj[basketData[i].name].map((item) => item['0']);
      timeStamp = timeStamps;
      growthRatePercentage.push(growthRate);

      //growthRate of Each coin over a period of time
      const firstVal = graphData.data[0];
      const lastVal = graphData.data[graphData.data.length - 1];

      const growthRateOfCoin =
        ((lastVal['4'] - firstVal['1']) * 100) / firstVal['1'];
      growthPercentageOfCoins.push({
        name: basketData[i].name,
        growthRate: growthRateOfCoin,
        withWeight: (growthRateOfCoin * basketData[i].weight) / 100,
      });
    }
    var sum = (r, a) =>
      r.map((b, i) => {
        let num = a[i] + b;
        return Number(num.toFixed(5));
      });
    let totalGrowthRates = growthRatePercentage.reduce(sum);
    let array = [];
    const data = (a1, a2) =>
      a1.map((a, i) => {
        let obj = {
          point: a,
          timeStamp: moment(a2[i]).format('MMM Do YY hh:mm a'),
        };
        array.push(obj);
      });
    data(totalGrowthRates, timeStamp);
    res.status(200).json({ growthPercentageOfCoins, graphData: array });
  } catch (err) {
    console.log('/graph_data', err);
    res.status(400).json({ msg: 'Error' });
  }
}

async function storeOHLCDataToDB(req, res) {
  try {
    const promises = coinsData.map(async (coin) => {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${
          coin.id
        }/ohlc?vs_currency=usd&days=${1}`
      );
      return { coin: coin.id, data: response.data };
    });
    const data = await Promise.all(promises);
    data.forEach(async (ohlcData) => {
      const ohlc = new Ohlc(ohlcData);
      await ohlc.save();
    });
    res?.json(data);
  } catch (err) {
    console.log('/store-coins', err);
    res?.status(400).json({ err });
  }
}

async function getOHLCDataFromDB(coinId) {
  try {
    const ohlcData = await Ohlc.findOne({ coin: coinId });
    console.log(ohlcData);
  } catch (err) {
    console.log('/get-ohlc-data', err);
  }
}

module.exports = {
  getDataPoints,
  storeOHLCDataToDB,
  getOHLCDataFromDB,
};
