const mongoose = require('mongoose');

const DevInvestSchema = new mongoose.Schema({
  userAddress: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  basketId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'devBasket',
  },
  coins: [
    {
      id: {
        type: String,
        required: true,
      },
      coinAddress: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      symbol: {
        type: String,
        required: true,
      },
      weight: {
        type: Number,
        required: true,
      },
      img: {
        type: String,
        required: true,
      },
    },
  ],
  created_at: { type: Date, default: Date.now },
});

const DevInvest = mongoose.model('devInvest', DevInvestSchema);

module.exports = DevInvest;
