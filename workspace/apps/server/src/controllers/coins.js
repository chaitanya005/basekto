const { default: axios } = require('axios');

const getCoinsList = (req, res) => {
  try {
    axios
      .get('https://api.coingecko.com/api/v3/coins/list?include_platform=true')
      .then((result) => {
        let coins = result.data.filter(
          (coin) =>
            coin.platforms?.ethereum?.length > 1 ||
            coin.platforms?.['polygon-pos']?.length > 1
        );
        res.json(coins);
      })
      .catch((err) => console.log(err));
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports = {
  getCoinsList,
};
