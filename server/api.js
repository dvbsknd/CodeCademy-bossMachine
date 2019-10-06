const express = require('express');
const apiRouter = express.Router();

const minionRouter = require('./routers/minions.js');
const meetingRouter = require('./routers/meetings.js');
const ideaRouter = require('./routers/ideas.js');

apiRouter.use('/minions', minionRouter);
apiRouter.use('/meetings', meetingRouter);
apiRouter.use('/ideas', ideaRouter);

module.exports = apiRouter;
