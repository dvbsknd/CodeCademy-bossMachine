// Database connection
const db = require('../db.js');

// Set-up the routers
const express = require('express');
const minionRouter = express.Router();

// Retrieve the minion middleware
const retrieveMinion = (req, res, next, id) => {
    const minion = db.getFromDatabaseById('minions', id);
    if (!minion) {
        res.status(404).send('No such minion.');
    } else {
        req.minion = minion;
        next();
    }
}
minionRouter.param('minionId', retrieveMinion);

// Set-up the work router
const workRouter = require('../routers/work.js');
minionRouter.use('/:minionId/work', workRouter);

// Main GET route
minionRouter.get('/', (req, res, next) => {
    const minions = db.getAllFromDatabase('minions');
    res.send(minions);
});

minionRouter.post('/', (req, res, next) => {
    const minion = req.body;
    if (!minion.name) {
        res.status(404).send('No minion data supplied.')
    } else {
        try {
            const newMinion = db.addToDatabase('minions', minion);
            res.status(201).send(newMinion);
            next();
        }
        catch(err) {
            res.status(404).send(err);
        }
    }
});

minionRouter.get('/:minionId', (req, res, next) => {
   res.send(req.minion); 
});

minionRouter.put('/:minionId', (req, res, next) => {
    const minion = req.body;
    if (!minion) {
        res.status(404).send('No minion data supplied.');
    } else {
        try {
            const updatedMinion = db.updateInstanceInDatabase('minions', minion);
            res.status(201).send(updatedMinion);
            next();
        } 
        catch(err) {
            res.status(404).send(err);
        }
    }
});

minionRouter.delete('/:minionId', (req, res, next) => {
    const minionId = req.minion.id;
    const deleted = false;
    try {
        deleted = db.deleteFromDatabasebyId('minions', minionId);
    } catch (err) {
        res.status(204).send(err);
    }
    if (deleted) {
        res.status(201).send('Successfully deleted.');
        next();
    }
});

// Export the router module
module.exports = minionRouter;
