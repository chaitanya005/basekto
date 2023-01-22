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
  createPublishBasketRequest,
  findBasketById,
  updateBasketWithPublishId,
  readPublishedBaskets,
  findPublishRequestByBasketId,
  publishBasketsByUser,
  readPublishedBasketRequests,
  readPublishedBasketRequestsData,
  userTotalInvestments;

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
    singleBasket = (_id) =>
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
          $match: {
            _id: ObjectId(_id),
          },
        },
      ]);
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
          $unwind: '$creator',
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
    createPublishBasketRequest = (userAddress, basketId) =>
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
        {
          $lookup: {
            from: 'users',
            localField: 'publishedBaskets.userAddress',
            foreignField: 'userAddress',
            as: 'creator',
          },
        },
        {
          $unwind: '$creator',
        },
      ]);
    findPublishRequestByBasketId = (basketId) =>
      publishedBasket.findOne({ basketId: basketId });
    publishBasketsByUser = (userAddress) =>
      Basket.find({
        accountId: userAddress,
        publishedBasket: { $exists: true },
      });
    readPublishedBasketRequests = () => publishedBasket.find();
    readPublishedBasketRequestsData = (basketIds) =>
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
          $match: {
            _id: { $in: basketIds },
          },
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
    singleBasket = (_id) =>
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
          $match: {
            _id: ObjectId(_id),
          },
        },
      ]);
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
    createPublishBasketRequest = (userAddress, basketId) =>
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
        {
          $lookup: {
            from: 'users',
            localField: 'publishedBaskets.userAddress',
            foreignField: 'userAddress',
            as: 'creator',
          },
        },
        {
          $unwind: '$creator',
        },
      ]);
    findPublishRequestByBasketId = (basketId) =>
      publishedBasket.findOne({ basketId: basketId });
    publishBasketsByUser = (userAddress) =>
      Basket.find({
        accountId: userAddress,
        publishedBasket: { $exists: true },
      });
    readPublishedBasketRequests = () => publishedBasket.find();
    readPublishedBasketRequestsData = (basketIds) =>
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
          $match: {
            _id: { $in: basketIds },
          },
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
    singleBasket = (_id) =>
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
          $match: {
            _id: ObjectId(_id),
          },
        },
      ]);
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
          $unwind: '$creator',
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
    createPublishBasketRequest = (userAddress, basketId) =>
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
        {
          $lookup: {
            from: 'users',
            localField: 'publishedBaskets.userAddress',
            foreignField: 'userAddress',
            as: 'creator',
          },
        },
        {
          $unwind: '$creator',
        },
      ]);
    findPublishRequestByBasketId = (basketId) =>
      devPublishedBasket.findOne({ basketId: basketId });
    publishBasketsByUser = (userAddress) =>
      DevBasket.find({
        accountId: userAddress,
        publishedBasket: { $exists: true },
      });
    readPublishedBasketRequests = () => devPublishedBasket.find();
    readPublishedBasketRequestsData = (basketIds) =>
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
          $match: {
            _id: { $in: basketIds },
          },
        },
      ]);

    // userTotalInvestments = (userAddress) => {
    //   DevInvest.aggregate([
    //     {
    //       $lookup: {
    //         from: 'users',
    //         localField: 'userAddress',
    //         foreignField: 'userAddress',
    //         as: 'user',
    //       },
    //     },
    //     {
    //       $group: {
    //         _id: '$userAddress',
    //         totalAmount: {
    //           $sum: 'amount',
    //         },
    //       },
    //     },
    //     {
    //       $match: { 'user.userAddress': userAddress },
    //     },
    //   ]);
    // };
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
    singleBasket = (_id) =>
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
          $match: {
            _id: ObjectId(_id),
          },
        },
      ]);
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
    createPublishBasketRequest = (userAddress, basketId) =>
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
        {
          $lookup: {
            from: 'users',
            localField: 'publishedBaskets.userAddress',
            foreignField: 'userAddress',
            as: 'creator',
          },
        },
        {
          $unwind: '$creator',
        },
      ]);
    findPublishRequestByBasketId = (basketId) =>
      devPublishedBasket.findOne({ basketId: basketId });
    publishBasketsByUser = (userAddress) =>
      DevBasket.find({
        accountId: userAddress,
        publishedBasket: { $exists: true },
      });
    readPublishedBasketRequests = () => devPublishedBasket.find();
    readPublishedBasketRequestsData = (basketIds) =>
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
          $match: {
            _id: { $in: basketIds },
          },
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
  createPublishBasketRequest,
  findBasketById,
  updateBasketWithPublishId,
  readPublishedBaskets,
  findPublishRequestByBasketId,
  publishBasketsByUser,
  readPublishedBasketRequests,
  readPublishedBasketRequestsData,
};
