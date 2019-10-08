const checkMillionDollarIdea = (req, res, next) => {
    const numWeeks = Number(req.body.numWeeks);
    const weeklyRevenue = Number(req.body.weeklyRevenue);
    if (!numWeeks || !weeklyRevenue) {
        res.status(400).send('Missing data.');
    } else if (numWeeks * weeklyRevenue >= 1000000) {
        next();
    } else {
        res.status(400).send('Stupid idea.');
    }
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
