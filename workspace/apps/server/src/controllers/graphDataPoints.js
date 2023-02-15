const { default: axios } = require('axios');
const { coinsData } = require('../coins');
const Ohlc = require('../models/ohlcData');
const { getGraphDataPts } = require('@basketo/web-utils');

// async function getDataPoints(req, res) {
//   try {
//     const { basketData, days } = req.body;
//     let growthRatePercentage = [],
//       timeStamp,
//       coinPrices = [];
//     const growthPercentageOfCoins = [];
//     for (let i = 0; i < basketData.length; i++) {
//       const graphData = await getOhlcData(basketData[i], days);
//       let coinsObj = {
//         [basketData[i].name]: graphData.data.map((item) => ({ ...item })),
//       };

//       let growthRate = coinsObj[basketData[i].name].map(
//         (item) =>
//           ((((item['4'] - item['1']) * 100) / item['1']) *
//             [basketData[i].weight]) /
//           100
//       );
//       let timeStamps = coinsObj[basketData[i].name].map((item) => item['0']);
//       timeStamp = timeStamps;
//       const singleCoinClosePrices = coinsObj[basketData[i].name].map(
//         (item) => (item['4'] * basketData[i].weight) / 100
//       );
//       coinPrices.push(singleCoinClosePrices);
//       growthRatePercentage.push(growthRate);

//       //(Incorrect Formula need to change in future)
//       //growthRate of Each coin over a period of time
//       // const firstVal = graphData.data[0];
//       // const lastVal = graphData.data[graphData.data.length - 1];

//       // const growthRateOfCoin =
//       //   ((lastVal['4'] - firstVal['1']) * 100) / firstVal['1'];
//       // growthPercentageOfCoins.push({
//       //   name: basketData[i].name,
//       //   growthRate: growthRateOfCoin,
//       //   withWeight: (growthRateOfCoin * basketData[i].weight) / 100,
//       // });
//     }
//     let sum = (r, a) =>
//       r.map((b, i) => {
//         let num = a[i] + b;
//         return Number(num.toFixed(5));
//       });
//     let prices = coinPrices.reduce(sum);
//     let totalGrowthRates = growthRatePercentage.reduce(sum);
//     let formattedGrowthRatesWithTimeStamp = [];
//     const data = (a1, a2) =>
//       a1.map((a, i) => {
//         let obj = {
//           'Growth Rate': a,
//           // timeStamp: moment(a2[i]).format('MMM Do YY - hh:mm a'),
//           timeStamp: a2[i],
//         };
//         formattedGrowthRatesWithTimeStamp.push(obj);
//       });
//     data(totalGrowthRates, timeStamp);
//     let formattedBasketPricesWithTimeStamp = [];
//     const dataOne = (a1, a2) =>
//       a1.map((a, i) => {
//         let obj = {
//           price: a,
//           timeStamp: a2[i],
//         };
//         formattedBasketPricesWithTimeStamp.push(obj);
//       });

//     dataOne(prices, timeStamp);
//     formattedGrowthRatesWithTimeStamp.pop();
//     const totalGrowthRateOfbasket =
//       formattedGrowthRatesWithTimeStamp[
//         formattedGrowthRatesWithTimeStamp.length - 1
//       ]['Growth Rate'] - formattedGrowthRatesWithTimeStamp[0]['Growth Rate'];
//     res.status(200).json({
//       graphData: formattedGrowthRatesWithTimeStamp,
//       growthRateOfbasket: totalGrowthRateOfbasket,
//     });
//   } catch (err) {
//     console.log('/graph_data', err);
//     res.status(400).json({ msg: 'Error' });
//   }
// }

async function getPricePoints(req, res) {
  try {
    const { basketData, days } = req.body;
    const { formattedBasketPricesWithTimeStamp, totalGrowthRateOfbasket } =
      await getGraphDataPts(basketData, days);

    res.status(200).json({
      graphData: formattedBasketPricesWithTimeStamp,
      growthRateOfbasket: totalGrowthRateOfbasket,
    });
  } catch (err) {
    console.log(err);
    res?.status(400).json({ err });
  }
}

async function storeOHLCDataToDB(req, res) {
  try {
    const promises = coinsData.map(async (coin) => {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${
          coin.id
        }/ohlc?vs_currency=usd&days=${7}`
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
    if (err.response.status === 429) {
      const retryAfter = err.response.headers['retry-after'];
      console.log(`Exceeded rate limit, waiting for ${retryAfter} seconds`);
      setTimeout(storeOHLCDataToDB, retryAfter * 1000);
    }
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
  storeOHLCDataToDB,
  getOHLCDataFromDB,
  getPricePoints,
};
