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
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// devPublishedBasketSchema.pre('remove', async function (next) {
//   await DevBasket.updateOne(
//     { publishedBasket: mongoose.Schema.Types.ObjectId(this._id) },
//     { $unset: { publishedBasket: '' } },
//     { new: true },
//     (err, result) => {
//       if (err) {
//         console.log(err);
//       } else {
//         console.log(result);
//       }
//     }
//   );

//   next();
// });

const devPublishedBasket = mongoose.model(
  'devPublishedBasket',
  devPublishedBasketSchema
);

module.exports = devPublishedBasket;
