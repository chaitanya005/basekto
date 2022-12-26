const Basket = require('../models/basket');
const User = require('../models/user');

const singleBasket = (_id) => Basket.findOne({ _id });
const findUserById = (userAddress) => User.findOne({ userAddress });
const userBaskets = (userAddress) => Basket.find({accountId:userAddress})

module.exports = { singleBasket, findUserById, userBaskets};
