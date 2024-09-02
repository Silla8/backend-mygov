const express =require('express');
const Authorize = require('../middlewares/Authorize');
const Validator = require('../middlewares/Validator');
const educationInfoControllers = require('../controllers/EducationInfo');


const Router = express.Router();


Router.post('/', Authorize, Validator, educationInfoControllers.getEducationInfo);

module.exports= Router;