const mongoose = require('mongoose');

const InvestSchema = new mongoose.Schema({
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
    ref: 'basket',
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
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Invest = mongoose.model('Invest', InvestSchema);

module.exports = Invest;
