const express =require('express');
const Authorize = require('../middlewares/Authorize');
const Validator = require('../middlewares/Validator');
const financialInfoControllers = require('../controllers/FinancialInfo');


const Router = express.Router();


Router.post('/', Authorize, Validator, financialInfoControllers.getFinancialInfo);

module.exports= Router;