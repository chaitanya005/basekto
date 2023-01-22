var express = require('express');
const { adminLogin, authMiddleware } = require('../controllers/admin');
var router = express.Router();

router.get('/admin/login', adminLogin);
// router.post('/admin/signup', adminSignUp);

module.exports = router;
