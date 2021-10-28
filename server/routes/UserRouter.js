const router = require('express').Router();
const userCtrl = require('../controllers/UserCtrl');


router.post('/register', userCtrl.register);

router.post('/login', userCtrl.login);

router.post('/refresh_token', userCtrl.getAccessToken);

router.post("/logout", userCtrl.logout);

module.exports = router;