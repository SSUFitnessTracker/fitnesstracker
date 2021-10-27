const router = require('express').Router();
const userCtrl = require('../controllers/UserCtrl');


router.post('/register', userCtrl.register);


module.exports = router;