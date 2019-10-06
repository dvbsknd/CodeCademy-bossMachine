const express = require('express');
const morgan = require('morgan');
const minionRouter = express.Router();

minionRouter.use(morgan('tiny'));

module.exports = minionRouter;
