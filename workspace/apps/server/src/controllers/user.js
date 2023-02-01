const User = require('../models/user');
const { findUserById } = require('../utils/db');

const createUser = async (req, res) => {
  try {
    if (!(await findUserById(req.body.userAddress))) {
      const user = new User({
        userAddress: req.body.userAddress,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
      });
      await user.save();
      res.send(user);
    } else {
      res.send({ isExist: true });
    }
  } catch (err) {
    res.status(400).json(err);
  }
};

const getUser = async (req, res) => {
  try {
    const user = await findUserById(req.params.id);
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

const updateUser = async (req, res) => {
  try {
    const filter = { userAddress: req.params.id };
    const updates = {
      $set: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        description: req.body.description,
      },
    };
    const result = await User.updateOne(filter, updates);
    res.json({ success: result.acknowledged });
  } catch (err) {
    res.status(400).json(err);
  }
};

const isExist = async (req, res) => {
  try {
    if (await findUserById(req.query.userAddress)) {
      res.send({ isExist: true });
    } else {
      res.send({ isExist: false });
    }
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports = {
  createUser,
  getUser,
  updateUser,
  isExist,
};
