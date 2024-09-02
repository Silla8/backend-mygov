const express =require('express');
const Authorize = require('../middlewares/Authorize');
const Validator = require('../middlewares/Validator');
const personaolInterestControllers = require('../controllers/PersonalInterest');


const Router = express.Router();


Router.post('/', Authorize, Validator, personaolInterestControllers.getPersonalInterest);

module.exports= Router;