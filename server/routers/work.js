// Database connection
const db = require('../db.js');

// Set-up the routers
const express = require('express');
const workRouter = express.Router();

workRouter.param('workId', (req, res, next, id) => {
    req.minion.work = db.getFromDatabaseById('work', id);
    next();
})

workRouter.get('/', (req, res, next) => {
    const minionId = Number(req.minion.id);
    const allWork = db.getAllFromDatabase('work');
    let work = [];
    work = allWork.filter(workItem => workItem.minionId == minionId);
    if (work) {
        res.status(200).send(work);
        next();
    } else {
        res.status(404).send('Minion has no work to do.');
    }
});

workRouter.put('/:workId', (req, res, next) => {
    try {
        const updatedWork = db.updateInstanceInDatabase('work', req.body);
        res.status(201).send(updatedWork);
    } catch (err) {
        res.status(400).send(err);
    }
});

workRouter.post('/', (req, res, next) => {
    try {
        const newWork = db.addToDatabase('work', req.body);
        res.status(201).send(newWork);
    } catch (err) {
        res.status(400).send(err);
    }
});

workRouter.delete('/:workId', (req, res, next) => {
    const workId = req.minion.work.id;
    try {
        db.deleteFromDatabasebyId('work', workId);
        res.status(204).send();
    } catch (err) {
        res.status(400).send(err);
    }
});

// Export the router module
module.exports = workRouter;
