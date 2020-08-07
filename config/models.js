const mongoose = require('mongoose');
var _ = require('lodash');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
var connection = require('./mongoose');
var config =  require('./env/development');

connection.connectDB(config["mongo-url"]).then(function (msg) {
    console.log(msg);
}).catch(function (err) {
    console.log("ERROR :: While Creating Connection " + err)
})
const User = new Schema({
    id: ObjectId,
    code: String,
    name: String,
    email: String,
    salt: String,
    hashed_password: String,
});

const Feeder = new Schema({
    id: ObjectId,
    type: String,
    condition: String,
    user_id: Number
})
const schemas = {
    USERS: {schema_name: 'users', schema: User},
    Feeders: {schema_name: 'feeders', schema: Feeder}
}
const getModel = function (collection) {
    if (_.isEmpty(schemas[collection])) {
        return 'Invalid Collection';
    }
    const model  = mongoose.model(schemas[collection].schema_name, schemas[collection].schema);
    return model;
}

module.exports = {getModel}