const { getOhlcData } = require('../utils/api');
const { singleBasket } = require('../utils/db');

const calculate = async (req, res) => {
  try {
    const { amount, days, id } = req.query;
    const basket = await singleBasket(id);
    const growthRatePercentages = [];
    for (let i = 0; i < basket.coins.length; i++) {
      const graphData = await getOhlcData(basket.coins[i], days);
      let coinsObj = {
        [basket.coins[i].name]: graphData.data.map((item) => ({ ...item })),
      };
      const firstDate = coinsObj[basket.coins[i].name][0];
      const lastDate =
        coinsObj[basket.coins[i].name][
          coinsObj[basket.coins[i].name].length - 1
        ];
      const growthRate =
        ((((lastDate['4'] - firstDate['1']) * 100) / firstDate['1']) *
          basket.coins[i].weight) /
        100;
      growthRatePercentages.push(growthRate);
    }

    const totalGrowth = growthRatePercentages.reduce((a, b) => a + b, 0);
    const returns = (amount * totalGrowth) / 100;
    res.send({
      growthPercentage: totalGrowth,
      returns: returns,
      roi: returns + Number(amount),
    });
  } catch (err) {
    console.log(err);
    res.json({ error: err }).status(400);
  }
};

module.exports = { calculate };
