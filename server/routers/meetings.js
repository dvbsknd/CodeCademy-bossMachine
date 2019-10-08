// Database connection
const db = require('../db.js');

// Set-up the router
const express = require('express');
const meetingRouter = express.Router();

meetingRouter.get('/', (req, res, next) => {
    const meetings = db.getAllFromDatabase('meetings');
    res.send(meetings);
});

meetingRouter.post('/', (req, res, next) => {
    try {
        const createdMeeting = db.createMeeting();
        const addedMeeting = db.addToDatabase('meetings', createdMeeting);
        if (!addedMeeting) { 
            throw new Error('Meeting not created');
        } else {
            res.status(201).send(addedMeeting);
            next();
        }
    }
    catch(err) {
        next(err);
    }
});

meetingRouter.delete('/', (req, res, next) => {
    const deleted = false;
    try {
        deleted = db.deleteAllFromDatabase('meetings');
    } catch (err) {
        res.status(204).send(err);
    }
    if (deleted) {
        res.status(201).send('Successfully deleted.');
        next();
    }
});

// Export the router module
module.exports = meetingRouter;
