const express = require('express');
const Authorize = require('../middlewares/Authorize');
const Multer = require('../middlewares/multer-config');
const pictureControllers = require('../controllers/Picture');

const Router = express.Router();


Router.get('/', Authorize, pictureControllers.getPicture); 
Router.put('/', Authorize, Multer, pictureControllers.putPicture);

module.exports= Router;