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
const { storeOHLCDataToDB } = require('./controllers/graphDataPoints');

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

const OhlcModel = mongoose.model(
  'ohlcs',
  new mongoose.Schema({ name: String })
);

function deleteExistingOhlcData() {
  OhlcModel.countDocuments({}, (err, count) => {
    if (err) {
      console.log(err);
    } else if (count > 0) {
      OhlcModel.deleteMany({}, (error) => {
        if (error) {
          console.log(error);
        } else {
          console.log('Deleted Existing OHLC Data');
          storeOHLCDataToDB();
        }
      });
    } else {
      console.log('Collection is Empty, Feel free to add Data!');
      storeOHLCDataToDB();
    }
  });
}

setInterval(deleteExistingOhlcData, 1000 * 60 * 60 * 4);
// 1 minute - 60,000 milliseconds
// 1 hour - 36,00,000 milliseconds
// 4 hours - 1,44,00,000 milliseconds

app.get('/', (req, res) => {
  res.json({
    message: 'HElloo!!',
  });
});

module.exports = app;
