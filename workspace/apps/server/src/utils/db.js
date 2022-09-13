const Basket = require('../models/basket');
const User = require('../models/user');

const singleBasket = (_id) => Basket.findOne({ _id });
const user = (userAddress) => User.findOne({ userAddress });
const userBaskets = (userAddress) => Basket.find({accountId:userAddress})

module.exports = { singleBasket, user ,userBaskets};
