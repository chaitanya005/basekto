const mongoose = require('mongoose');

const devPublishedBasketSchema = new mongoose.Schema({
  userAddress: {
    type: String,
    required: true,
  },
  basketId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'devBaskets',
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});
const devPublishedBasket = mongoose.model(
  'devPublishedBasket',
  devPublishedBasketSchema
);

module.exports = devPublishedBasket;
