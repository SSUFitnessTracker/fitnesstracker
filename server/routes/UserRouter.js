const router = require('express').Router();
const userCtrl = require('../controllers/UserCtrl');
const auth = require('../middleware/auth');

router.post('/register', userCtrl.register);

router.post('/activation', userCtrl.activateAccount);

router.post('/login', userCtrl.login);

router.post('/refresh_token', userCtrl.getAccessToken);

router.post('/forgot', userCtrl.forgotPassword);

router.post('/resetPassword', auth, userCtrl.resetPassword);

router.post("/logout", userCtrl.logout);

router.get('/info', userCtrl.getUserInfo);

module.exports = router;