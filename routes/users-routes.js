const express = require('express');
const usersController = require('../controller/users-contoller');
const router = express.Router();
const {check} = require('express-validator');
const checkAuth = require('../middleware/check-auth');



router.post(
    '/signup',
    [
        check("name").notEmpty(),
        check("email").normalizeEmail().isEmail(),
        check('password').isLength({min: 6})
    ],
    usersController.signup
);
router.use('/isAuth', checkAuth);

router.post('/login', usersController.login);

router.get('/hesabim', checkAuth, usersController.myAcc);



module.exports = router;