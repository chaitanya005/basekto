const Basket = require('../models/basket');
const DevBasket = require('../models/devBasket');
const User = require('../models/user');

let createNewBasket, singleBasket, user, findUserById, userBaskets, readBaskets;

switch (process.env.NODE_ENV) {
  case 'production':
    createNewBasket = (accountId, name, description, symbol, coins) =>
      new Basket({
        accountId: accountId,
        name: name,
        description: description,
        symbol: symbol,
        coins: coins,
      });
    singleBasket = (_id) => Basket.findOne({ _id });
    user = (userAddress) => User.findOne({ userAddress });
    findUserById = (userAddress) => User.findOne({ userAddress });
    userBaskets = (userAddress) => Basket.find({ accountId: userAddress });
    readBaskets = () => Basket.find();
    break;

  default:
    createNewBasket = (accountId, name, description, symbol, coins) =>
      new DevBasket({
        accountId: accountId,
        name: name,
        description: description,
        symbol: symbol,
        coins: coins,
      });
    singleBasket = (_id) => DevBasket.findOne({ _id });
    user = (userAddress) => User.findOne({ userAddress });
    findUserById = (userAddress) => User.findOne({ userAddress });
    userBaskets = (userAddress) => DevBasket.find({ accountId: userAddress });
    readBaskets = () => DevBasket.find();
    break;
}

module.exports = {
  singleBasket,
  user,
  userBaskets,
  readBaskets,
  findUserById,
  createNewBasket,
};
