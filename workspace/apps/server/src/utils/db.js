const Basket = require('../models/basket');
const DevBasket = require('../models/devBasket');
const User = require('../models/user');

const singleBasket = (_id) =>
  process.env.NODE_ENV !== 'production'
    ? DevBasket.findOne({ _id })
    : Basket.findOne({ _id });
const user = (userAddress) => User.findOne({ userAddress });
const findUserById = (userAddress) => User.findOne({ userAddress });
const userBaskets = (userAddress) => Basket.find({ accountId: userAddress });
const readBaskets = () =>
  process.env.NODE_ENV !== 'production' ? DevBasket.find() : Basket.find();

module.exports = { singleBasket, user, userBaskets, readBaskets, findUserById };
