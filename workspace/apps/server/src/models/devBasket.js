const mongoose = require('mongoose');

const DevBasketSchema = new mongoose.Schema({
  accountId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  symbol: {
    type: String,
    required: true,
  },
  publishedBasket: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'devPublishedBasket',
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
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const DevBasket = mongoose.model('dev-basket', DevBasketSchema);

module.exports = DevBasket;
