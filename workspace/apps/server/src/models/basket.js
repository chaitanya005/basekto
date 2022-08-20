const mongoose = require('mongoose');

const BasketSchema = new mongoose.Schema({
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
    required: true,
  },
  symbol: {
    type: String,
    required: true,
  },
  coins: [
    {
      id: {
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
});

const Basket = mongoose.model('Basket', BasketSchema);

module.exports = Basket;
