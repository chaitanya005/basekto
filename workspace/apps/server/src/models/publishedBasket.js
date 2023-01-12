const mongoose = require('mongoose');

const publishedBasketSchema = new mongoose.Schema({
  userAddress: {
    type: String,
    required: true,
  },
  basketId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Basket',
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const publishedBasket = mongoose.model(
  'publishedBasketSchema',
  publishedBasketSchema
);

module.exports = publishedBasket;
