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

router.get('/info', auth, userCtrl.getUserInfo);

router.patch('/update', auth, userCtrl.updateUser);

router.patch('/setUserFitness', auth, userCtrl.setUserFitness);

router.patch('/setUserHeight', auth, userCtrl.setUserHeight);

router.patch('/setUserWeight', auth, userCtrl.setUserWeight);

router.post('/completedWorkout', auth, userCtrl.addCompletedWorkout);

router.post('/updateFitness', auth, userCtrl.updateFitnessLevel);

module.exports = router;