var express = require('express');
const { adminLogin, getUserActivity } = require('../controllers/admin');
var router = express.Router();

router.get('/admin/login', adminLogin);
router.get('/admin/dashboard/users/activity', getUserActivity);
// router.post('/admin/signup', adminSignUp);

module.exports = router;
