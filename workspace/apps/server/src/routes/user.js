var express = require('express');
const { createUser, getUser, getUserAddressByPublicUrl, updateUser, isExist } = require('../controllers/user');
var router = express.Router();

router.post('/user/new', createUser);
router.get('/user/exist', isExist);
router.get('/user/:id', getUser);
router.get('/user', getUserAddressByPublicUrl);
router.put('/user/:id', updateUser);

module.exports = router;
