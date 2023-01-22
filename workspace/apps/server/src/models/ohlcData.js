const mongoose = require('mongoose');

const ohlcSchema = new mongoose.Schema({
  coin: {
    type: String,
    required: true,
  },
  data: {
    type: Array,
    required: true,
  },
});

const Ohlc = mongoose.model('Ohlc', ohlcSchema);

module.exports = Ohlc;
