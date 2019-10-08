// Database connection
const db = require('../db.js');

// Set-up the router
const express = require('express');
const ideaRouter = express.Router();

// Retrieve the idea middleware
const retrieveIdea = (req, res, next, id) => {
    const idea = db.getFromDatabaseById('ideas', id);
    if (!idea) {
        res.status(404).send('No such idea.');
    } else {
        req.idea = idea;
        next();
    }
}
ideaRouter.param('ideaId', retrieveIdea);

// Check idea commercial value middleware
const checkMillionDollarIdea = require('../checkMillionDollarIdea.js');

ideaRouter.get('/', (req, res, next) => {
    const ideas = db.getAllFromDatabase('ideas');
    res.send(ideas);
});

ideaRouter.post('/', checkMillionDollarIdea, (req, res, next) => {
    const idea = req.body;
    if (!idea.name) {
        res.status(404).send('No idea data supplied.')
    } else {
        try {
            const newIdea = db.addToDatabase('ideas', idea);
            res.status(201).send(newIdea);
            next();
        }
        catch(err) {
            next(err);
        }
    }
});

ideaRouter.get('/:ideaId', (req, res, next) => {
   res.send(req.idea); 
});

ideaRouter.put('/:ideaId', (req, res, next) => {
    const idea = req.body;
    if (!idea) {
        res.status(404).send('No idea data supplied.');
    } else {
        try {
            const updatedIdea = db.updateInstanceInDatabase('ideas', idea);
            if (!updatedIdea) {
                throw new Error('Invalid format.');
            }
            res.status(201).send(updatedIdea);
            next();
        } 
        catch(err) {
            next(err);
        }
    }
});

ideaRouter.delete('/:ideaId', (req, res, next) => {
    const ideaId = req.idea.id;
    const deleted = false;
    try {
        deleted = db.deleteFromDatabasebyId('ideas', ideaId);
    } catch (err) {
        res.status(204).send(err);
    }
    if (deleted) {
        res.status(201).send('Successfully deleted.');
        next();
    }
});

// Export the router module
module.exports = ideaRouter;
