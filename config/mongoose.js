"use strict";

var mongoose = require('mongoose');

var connectDB = async function (url) {
    if (!mongoose.connections[0]._hasOpened) {
        mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        return 'Successfully Connected';
    }
    return;
}
module.exports = {connectDB}