const express = require('express');
const morgan = require('morgan');
const meetingRouter = express.Router();

meetingRouter.use(morgan('tiny'));

module.exports = meetingRouter;
