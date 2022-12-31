const { default: axios } = require('axios');

const getCoinPrice = async (req, res) => {
  try {
    const { coins } = req.query;
    const prices = [];
    for (let i = 0; i < JSON.parse(coins).length; i++) {
      const priceOfCoin = await axios.get(
        `https://api.coingecko.com/api/v3/simple/price?ids=${
          JSON.parse(coins)[i].id
        }&vs_currencies=usd`
      );
      prices.push(Object.values(priceOfCoin.data)[0]);
    }
    res.json(prices);
  } catch (err) {
    console.log('/price', err);
    res.status(400).json(err);
  }
};

const getCoinGrowthRate = async (req, res) => {
  try {
    const { coins } = req.query;
    const parsedCoins = JSON.parse(coins);
    const growthPercentageOfCoins = [];
    for (let i = 0; i < parsedCoins.length; i++) {
      const growthRateOfCoin = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${
          parsedCoins[i].id
        }/ohlc?vs_currency=usd&days=${7}`
      );

      const firstVal = growthRateOfCoin.data[0];
      const lastVal = growthRateOfCoin.data[growthRateOfCoin.data.length - 1];

      const growthRate = ((lastVal['4'] - firstVal['1']) * 100) / firstVal['1'];

      growthPercentageOfCoins.push({
        name: parsedCoins[i].name,
        growthRate: growthRate,
        withWeight: (growthRate * parsedCoins[i].weight) / 100,
      });
    }
    res.send(growthPercentageOfCoins);
  } catch (err) {
    console.log('/growth-rate', err);
    res.status(400).json(err);
  }
};

module.exports = { getCoinPrice, getCoinGrowthRate };
