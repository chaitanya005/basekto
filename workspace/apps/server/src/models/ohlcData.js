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
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Ohlc = mongoose.model('Ohlc', ohlcSchema);

module.exports = Ohlc;
