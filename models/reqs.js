const mongoose = require('mongoose');
const config = require('../config/database');

//User Schema
const ReqSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String
    },
    request: {
        type: String,
        required: true
    },
    response: {
        type: String,
        required: true
    },
    ale_messages: {
        type: [String]
    }
});


const Req = module.exports = mongoose.model('Req', ReqSchema);

module.exports.getReqById = function(id, callback) {
    Req.findById(id, callback);
};

module.exports.updateReq = function(update, callback) {
    Req.findOneAndUpdate(update.title, update, callback);
};

module.exports.getReqByTitle = function(title, callback) {
    const query = { title: title };
    Req.findOne(query, callback);
};

module.exports.getAttrByTitle = function(title, attr, callback) {
    const query = { title: title };
    Req.findOne(query, (err, returnedReq) => {
        if (err) {
            throw err;
        }
        callback(err, returnedReq ? returnedReq[attr] : null);
    });
};