const Basket = require('../models/basket');
const DevBasket = require('../models/devBasket');
const User = require('../models/user');
const { ObjectId } = require('mongodb');
const DevInvest = require('../models/devInvest');
const Invest = require('../models/invest');
const devPublishedBasket = require('../models/devPublishedBasket');
const publishedBasket = require('../models/publishedBasket');

let createNewBasket,
  singleBasket,
  user,
  findUserById,
  userBaskets,
  readBaskets,
  userInvestedBaskets,
  userInvestmentsInBasket,
  createNewInvestment,
  createPublishBasket,
  findBasketById,
  updateBasketWithPublishId,
  readPublishedBaskets;

switch (process.env.RAILGUN_ENV) {
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
    userInvestedBaskets = (userAddress) =>
      Basket.aggregate([
        {
          $lookup: {
            from: 'users',
            localField: 'accountId',
            foreignField: 'userAddress',
            as: 'creator',
          },
        },
        {
          $lookup: {
            from: 'invests',
            localField: '_id',
            foreignField: 'basketId',
            as: 'invested_basket',
          },
        },
        {
          $lookup: {
            from: 'users',
            localField: 'invested_basket.userAddress',
            foreignField: 'userAddress',
            as: 'user',
          },
        },
        {
          $match: {
            'user.userAddress': userAddress,
          },
        },
      ]);
    userInvestmentsInBasket = (userAddress, basketId) =>
      Basket.aggregate([
        {
          $lookup: {
            from: 'invests',
            localField: '_id',
            foreignField: 'basketId',
            as: 'invested_basket',
          },
        },
        {
          $unwind: '$invested_basket',
        },
        {
          $lookup: {
            from: 'users',
            localField: 'invested_basket.userAddress',
            foreignField: 'userAddress',
            as: 'user',
          },
        },
        {
          $match: {
            $and: [
              { 'user.userAddress': userAddress },
              { 'invested_basket.basketId': ObjectId(basketId) },
            ],
          },
        },
        {
          $group: {
            _id: '$_id',
            invested_basket: {
              $push: '$invested_basket',
            },
            totalAmount: {
              $sum: '$invested_basket.amount',
            },
          },
        },
      ]);
    createNewInvestment = (basketId, userAddress, coins, amount) =>
      new Invest({
        userAddress: userAddress,
        basketId: basketId,
        amount: amount,
        coins: coins,
      });
    createPublishBasket = (userAddress, basketId) =>
      new publishedBasket({
        userAddress: userAddress,
        basketId: basketId,
      });
    findBasketById = (basketId) => Basket.findById(ObjectId(basketId));
    updateBasketWithPublishId = (basketId, newPublishedBasket) =>
      Basket.findByIdAndUpdate(
        basketId,
        { $set: { publishedBasket: newPublishedBasket._id } },
        { new: true }
      );
    readPublishedBaskets = () =>
      Basket.aggregate([
        {
          $lookup: {
            from: 'publishedbaskets',
            localField: 'publishedBasket',
            foreignField: '_id',
            as: 'publishedBaskets',
          },
        },
        {
          $unwind: '$publishedBaskets',
        },
      ]);
    break;

  case 'staging':
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
    userInvestedBaskets = (userAddress) =>
      Basket.aggregate([
        {
          $lookup: {
            from: 'users',
            localField: 'accountId',
            foreignField: 'userAddress',
            as: 'creator',
          },
        },
        {
          $lookup: {
            from: 'invests',
            localField: '_id',
            foreignField: 'basketId',
            as: 'invested_basket',
          },
        },
        {
          $lookup: {
            from: 'users',
            localField: 'invested_basket.userAddress',
            foreignField: 'userAddress',
            as: 'user',
          },
        },
        {
          $match: {
            'user.userAddress': userAddress,
          },
        },
      ]);
    userInvestmentsInBasket = (userAddress, basketId) =>
      Basket.aggregate([
        {
          $lookup: {
            from: 'invests',
            localField: '_id',
            foreignField: 'basketId',
            as: 'invested_basket',
          },
        },
        {
          $unwind: '$invested_basket',
        },
        {
          $lookup: {
            from: 'users',
            localField: 'invested_basket.userAddress',
            foreignField: 'userAddress',
            as: 'user',
          },
        },
        {
          $match: {
            $and: [
              { 'user.userAddress': userAddress },
              { 'invested_basket.basketId': ObjectId(basketId) },
            ],
          },
        },
        {
          $group: {
            _id: '$_id',
            invested_basket: {
              $push: '$invested_basket',
            },
            totalAmount: {
              $sum: '$invested_basket.amount',
            },
          },
        },
      ]);
    createNewInvestment = (basketId, userAddress, coins, amount) =>
      new Invest({
        userAddress: userAddress,
        basketId: basketId,
        amount: amount,
        coins: coins,
      });
    createPublishBasket = (userAddress, basketId) =>
      new publishedBasket({
        userAddress: userAddress,
        basketId: basketId,
      });
    findBasketById = (basketId) => Basket.findById(ObjectId(basketId));
    updateBasketWithPublishId = (basketId, newPublishedBasket) =>
      Basket.findByIdAndUpdate(
        basketId,
        { $set: { publishedBasket: newPublishedBasket._id } },
        { new: true }
      );
    readPublishedBaskets = () =>
      Basket.aggregate([
        {
          $lookup: {
            from: 'publishedbaskets',
            localField: 'publishedBasket',
            foreignField: '_id',
            as: 'publishedBaskets',
          },
        },
        {
          $unwind: '$publishedBaskets',
        },
      ]);
    break;

  case 'testnet':
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
    userInvestedBaskets = (userAddress) =>
      DevBasket.aggregate([
        {
          $lookup: {
            from: 'users',
            localField: 'accountId',
            foreignField: 'userAddress',
            as: 'creator',
          },
        },
        {
          $lookup: {
            from: 'devinvests',
            localField: '_id',
            foreignField: 'basketId',
            as: 'invested_basket',
          },
        },
        {
          $lookup: {
            from: 'users',
            localField: 'invested_basket.userAddress',
            foreignField: 'userAddress',
            as: 'user',
          },
        },
        {
          $match: {
            'user.userAddress': userAddress,
          },
        },
      ]);
    userInvestmentsInBasket = (userAddress, basketId) =>
      DevBasket.aggregate([
        {
          $lookup: {
            from: 'devinvests',
            localField: '_id',
            foreignField: 'basketId',
            as: 'invested_basket',
          },
        },
        {
          $unwind: '$invested_basket',
        },
        {
          $lookup: {
            from: 'users',
            localField: 'invested_basket.userAddress',
            foreignField: 'userAddress',
            as: 'user',
          },
        },
        {
          $match: {
            $and: [
              { 'user.userAddress': userAddress },
              { 'invested_basket.basketId': ObjectId(basketId) },
            ],
          },
        },
        {
          $group: {
            _id: '$_id',
            invested_basket: {
              $push: '$invested_basket',
            },
            totalAmount: {
              $sum: '$invested_basket.amount',
            },
          },
        },
      ]);
    createNewInvestment = (basketId, userAddress, coins, amount) =>
      new DevInvest({
        userAddress: userAddress,
        basketId: basketId,
        amount: amount,
        coins: coins,
      });
    createPublishBasket = (userAddress, basketId) =>
      new devPublishedBasket({
        userAddress: userAddress,
        basketId: basketId,
      });
    findBasketById = (basketId) => DevBasket.findById(ObjectId(basketId));
    updateBasketWithPublishId = (basketId, newPublishedBasket) =>
      DevBasket.findByIdAndUpdate(
        basketId,
        { $set: { publishedBasket: newPublishedBasket._id } },
        { new: true }
      );
    readPublishedBaskets = () =>
      DevBasket.aggregate([
        {
          $lookup: {
            from: 'devpublishedbaskets',
            localField: 'publishedBasket',
            foreignField: '_id',
            as: 'publishedBaskets',
          },
        },
        {
          $unwind: '$publishedBaskets',
        },
      ]);

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
    userInvestedBaskets = (userAddress) =>
      DevBasket.aggregate([
        {
          $lookup: {
            from: 'users',
            localField: 'accountId',
            foreignField: 'userAddress',
            as: 'creator',
          },
        },
        {
          $lookup: {
            from: 'devinvests',
            localField: '_id',
            foreignField: 'basketId',
            as: 'invested_basket',
          },
        },
        {
          $lookup: {
            from: 'users',
            localField: 'invested_basket.userAddress',
            foreignField: 'userAddress',
            as: 'user',
          },
        },
        {
          $match: {
            'user.userAddress': userAddress,
          },
        },
      ]);
    userInvestmentsInBasket = (userAddress, basketId) =>
      DevBasket.aggregate([
        {
          $lookup: {
            from: 'devinvests',
            localField: '_id',
            foreignField: 'basketId',
            as: 'invested_basket',
          },
        },
        {
          $unwind: '$invested_basket',
        },
        {
          $lookup: {
            from: 'users',
            localField: 'invested_basket.userAddress',
            foreignField: 'userAddress',
            as: 'user',
          },
        },
        {
          $match: {
            $and: [
              { 'user.userAddress': userAddress },
              { 'invested_basket.basketId': ObjectId(basketId) },
            ],
          },
        },
        {
          $group: {
            _id: '$_id',
            invested_basket: {
              $push: '$invested_basket',
            },
            totalAmount: {
              $sum: '$invested_basket.amount',
            },
          },
        },
      ]);
    createNewInvestment = (basketId, userAddress, coins, amount) =>
      new DevInvest({
        userAddress: userAddress,
        basketId: basketId,
        amount: amount,
        coins: coins,
      });
    createPublishBasket = (userAddress, basketId) =>
      new devPublishedBasket({
        userAddress: userAddress,
        basketId: basketId,
      });
    findBasketById = (basketId) => DevBasket.findById(ObjectId(basketId));
    updateBasketWithPublishId = (basketId, newPublishedBasket) =>
      DevBasket.findByIdAndUpdate(
        basketId,
        { $set: { publishedBasket: newPublishedBasket._id } },
        { new: true }
      );
    readPublishedBaskets = () =>
      DevBasket.aggregate([
        {
          $lookup: {
            from: 'devpublishedbaskets',
            localField: 'publishedBasket',
            foreignField: '_id',
            as: 'publishedBaskets',
          },
        },
        {
          $unwind: '$publishedBaskets',
        },
      ]);
    break;
}

module.exports = {
  singleBasket,
  user,
  userBaskets,
  readBaskets,
  findUserById,
  createNewBasket,
  userInvestedBaskets,
  userInvestmentsInBasket,
  createNewInvestment,
  createPublishBasket,
  findBasketById,
  updateBasketWithPublishId,
  readPublishedBaskets,
};
