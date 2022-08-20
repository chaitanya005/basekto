const User = require('../models/user');
const { user } = require('../utils/db');

const createUser = async (req, res) => {
  try {
    if (!(await user(req.body.userAddress))) {
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
    const user = await User.findOne({ _id: req.params.id });
    res.send(user);
  } catch (err) {
    res.status(400).json(err);
  }
};

const isExist = async (req, res) => {
  try {
    if (await user(req.query.userAddress)) {
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
  isExist,
};
