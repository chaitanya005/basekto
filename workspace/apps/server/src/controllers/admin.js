const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');
const { collectionsForActivity } = require('../utils/db');

const adminSignUp = async (req, res) => {
  try {
    const admin = new Admin({
      email: req.body.email,
      password: req.body.password,
    });
    await admin.save();
    res.status(201).send({ admin });
  } catch (error) {
    res.status(400).send(error);
  }
};

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.query;
    const admin = await Admin.findOne({ email: email, password: password });
    if (!admin) {
      return res.status(401).send({ error: 'Invalid email or password' });
    }
    // Generate a JWT token
    let expiresIn = '1h';
    const token = jwt.sign({ _id: admin._id }, process.env.JWT_SECRET, {
      expiresIn,
    });
    res.header('x-auth-token', token).send({
      _id: admin._id,
      email: admin.email,
      token: token,
    });
  } catch (err) {
    res.status(500).send({ error: 'Internal server error' });
  }
};

const authMiddleware = async (req, res, next) => {
  const token = req.headers['x-access-token'] || req.headers.authorization;
  if (!token) {
    return res.status(401).send({
      message: 'Access denied. No token provided.',
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await Admin.findById(decoded._id);
    next();
  } catch (ex) {
    res.status(400).send({
      message: 'Invalid token.',
    });
  }
};

const getUserActivity = async (req, res) => {
  const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

  try {
    const results = await Promise.all(
      collectionsForActivity.map(async (collection) => {
        return await collection.model.aggregate([
          {
            $match: {
              createdAt: {
                $gt: oneDayAgo,
                $lt: new Date(),
              },
            },
          },
        ]);
      })
    );

    const [baskets, publishedBaskets, users, invests] = results;
    res.json({ baskets, publishedBaskets, users, invests });
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

module.exports = { adminLogin, adminSignUp, authMiddleware, getUserActivity };
