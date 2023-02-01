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
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const publishedBasket = mongoose.model(
  'publishedBasket',
  publishedBasketSchema
);

module.exports = publishedBasket;
