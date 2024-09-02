const express =require('express');
const Authorize = require('../middlewares/Authorize');
const Validator = require('../middlewares/Validator');
const workplaceInfoControllers = require('../controllers/WorkplaceInfo');


const Router = express.Router();


Router.post('/', Authorize, Validator, workplaceInfoControllers.getWorkplaceInfo);

module.exports= Router;