const express = require('express');
const morgan = require('morgan');
const ideaRouter = express.Router();

ideaRouter.use(morgan('tiny'));

module.exports = ideaRouter;
