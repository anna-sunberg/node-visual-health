const mongoose = require('mongoose');

const WeightEntry = mongoose.model('WeightEntries');

const {
    sendError,
    UNAUTHORIZED
} = require('./errorController');

exports.addWeightEntries = function(req, res) {
    if (!req.session.authenticated) return sendError(UNAUTHORIZED, res);

    let addedCount = 0;

    req.body.data.forEach(function(entry) {
        const weightEntry = new WeightEntry({
            value: entry.value,
            date: new Date(entry.startDate),
            username: req.session.email
        });

        weightEntry.save(function(err) {
            if (!err) addedCount++;
        });
    });

    res.json({
        addedCount
    });
}

exports.getWeightEntries = function(req, res) {
    if (!req.session.authenticated) return sendError(UNAUTHORIZED, res);

    WeightEntry.find({ email: req.session.email }, function(err, entries) {
        res.json(entries);
    });
};
