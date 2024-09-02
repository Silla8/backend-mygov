const express =require('express');
const Authorize = require('../middlewares/Authorize');
const Validator = require('../middlewares/Validator');
const personaolInfoControllers = require('../controllers/PersonalInfo');


const Router = express.Router();


Router.post('/', Authorize, Validator, personaolInfoControllers.getPersonalInfo);

module.exports= Router;