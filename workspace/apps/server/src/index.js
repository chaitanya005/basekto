const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const port = process.env.PORT || 8000;

require('dotenv').config();
const ohlcDataPts = require('./routes/ohlcDataPoints');
const basket = require('./routes/basket');
const user = require('./routes/user');
const coinData = require('./routes/coinData');
const calculate = require('./routes/calculator');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', ohlcDataPts);
app.use('/api', coinData);
app.use('/api', calculate);

mongoose
  .connect(
    'mongodb+srv://admin:admin@free-testnet.nckjmcl.mongodb.net/?retryWrites=true&w=majority',
    { useNewUrlParser: true }
  )
  .then(() => {
    app.use('/api', basket);
    app.use('/api', user);
    app.listen(port, () => {
      console.log('Server has started at', port);
    });
  })
  .catch((err) => console.log(err));

app.get('/', (req, res) => {
  res.json({
    message: 'HElloo!!',
  });
});

module.exports = app;
