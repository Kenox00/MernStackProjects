const mongoose = require('mongoose');

const modelsSchema = new mongoose.Schema({
    key: {type:String},
},{
    timestamps: true,
});

const Models = mongoose.model('models', modelsSchema)

module.exports = Models