const express = require('express');
const Validator = require('../middlewares/Validator');
const Authorize = require('../middlewares/Authorize');
const profileControllers = require('../controllers/Profile');


const Router = express.Router();

Router.post('/', Authorize, Validator, profileControllers.getProfile);


module.exports = Router;