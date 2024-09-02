const express =require('express');
const Authorize = require('../middlewares/Authorize');
const Validator = require('../middlewares/Validator');
const familyInfoControllers = require('../controllers/FamilyInfo');


const Router = express.Router();


Router.post('/', Authorize, Validator, familyInfoControllers.getFamilyInfo);

module.exports= Router;