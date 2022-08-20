const { default: axios } = require('axios');
const moment = require('moment');
const { getOhlcData } = require('../utils/api');

async function getDataPoints(req, res) {
  try {
    const { basketData, days } = req.body;
    let growthRatePercentage = [],
      timeStamp;
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
    res.status(200).json(array);
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: 'Error' });
  }
}

module.exports = {
  getDataPoints,
};
