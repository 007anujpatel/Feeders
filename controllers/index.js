'use strict';
var jwt = require('jsonwebtoken');
var _ = require('lodash');
var models = require('../config/models');
var shortId = require('shortid');

const saveData = function (req, res, cb) {
    if (_.isEmpty(req.body)) {
        return cb("Empty Post Body");
    }
    var unique_id = req.body.Id;
    var data = {
        type: req.body.Type,
        condition: req.body.Condition,
        user_id: req.body.Id,
    }
    let feeder = models.getModel('Feeders');
    feeder.findOne({"user_id": req.body.Id}).exec(function (err, record) {
        if (err) {
            return cb({message: err});
        } else {
            if (record) {
                return cb({message: "Data Found", data: data, code: 200});
            } else {
                feeder = new feeder(data);
                feeder.save(function (err, res) {
                    if (err) {
                        return cb({message: err});
                    }
                    return cb({message: `Saved as ID: ${unique_id}`, code: 200});
                });
            }
        }
    })

}

const update = function (req, res, cb) {
    if (_.isEmpty(req.body)) {
        return cb("Empty Post Body");
    }
    var unique_id = req.body.Id;
    let feeder = models.getModel('Feeders');

    console.log(req.body.Type);
    console.log(req.body.Condition);

    feeder.updateOne({"user_id": req.body.Id}, {
        $set: {
            type: req.body.Type,
            condition: req.body.Condition
        }
    }, function (err, updateStatus) {
        if (err) {
            return cb({message: err});
        }
        return cb({message: `Saved as ID: ${unique_id}`, code: 200});
    })

}

const search = function (req, res, cb) {
    var uniqueId = req.body.Id;
    if (_.isEmpty(uniqueId)) {
        return cb("Empty Post Body");
    }
    let feeder = models.getModel('Feeders');
    feeder.findOne({"user_id": uniqueId}).exec(function (err, record) {
        if (err) {
            return cb({message: err});
        } else {
            if (record) {
                return cb({message: "Data Found", data: record, code: 200});
            } else {
                return cb({message: "Data Not Found", code: 200});
            }
        }
    });
}

module.exports = {saveData, search, update}