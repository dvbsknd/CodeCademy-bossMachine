// Main API router
const express = require('express');
const apiRouter = express.Router();

// Logging middleware
const morgan = require('morgan');
// apiRouter.use(morgan('tiny'));

// Individual endpoint routers
const minionRouter = require('./routers/minions.js');
const meetingRouter = require('./routers/meetings.js');
const ideaRouter = require('./routers/ideas.js');

apiRouter.use('/minions', minionRouter);
apiRouter.use('/meetings', meetingRouter);
apiRouter.use('/ideas', ideaRouter);

// Export router for use by server.js
module.exports = apiRouter;
