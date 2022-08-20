var express = require('express');
const { createUser, getUser, isExist } = require('../controllers/user');
var router = express.Router();

router.post('/user/new', createUser);
router.get('/user/exist', isExist);
router.get('/user/:id', getUser);

module.exports = router;
