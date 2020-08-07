'use strict';
var jwt = require('jsonwebtoken');
var _ = require('lodash');
var config = require('../config/env/development');

var verifyToken = (req, res, next) => {
    var token = _.get(req, ['headers','x-access-token'], _.get(req, ['headers', 'authorization'], ''));

    if (token) {
        jwt.verify(token, config.secret, (err, decoded) => {
            if (err) {
                return res.json({
                    success: false,
                    message: 'Token is not valid'
                });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.json({
            success: false,
            message: 'Auth token is not supplied'
        });
    }
};

module.exports = {verifyToken}