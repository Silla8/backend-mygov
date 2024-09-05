const express = require('express');
const AuthControllers = require('../controllers/Authentication');
const Validator = require('../middlewares/Validator');
const Authorize = require('../middlewares/Authorize');
const Authenticated = require('../middlewares/Authenticated');
const checkPassword = require("../middlewares/CheckPassword");
const RecoveryValidator = require('../middlewares/RecoveryValidator');

const Router = express.Router();


Router.post('/signin', Validator, AuthControllers.signIn);
Router.post('/signup', Validator, AuthControllers.singUp);
Router.get('/verify-token', Authenticated);
Router.post('/check-password', Authorize, checkPassword);
Router.put('/change-password', Authorize, AuthControllers.ChangePassword);
Router.post('/password-recovery', RecoveryValidator, AuthControllers.Recovery);


module.exports = Router; 