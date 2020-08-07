'use strict';
var _ = require('lodash');
var crypto = require('crypto');

const generatePassword = function (salt, password) {
    if (!salt || !password)
        return '';
    var salt = new Buffer(salt, 'base64');
    var pass =  '';
    try {
        pass = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('base64');
    } catch (e) {
        console.log(e)
        pass = '';
    }
    return pass;
}

const makeSalt = function () {
    return crypto.randomBytes(16).toString('base64');
}

module.exports = {generatePassword, makeSalt}