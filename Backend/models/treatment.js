const mongoose = require('mongoose')
const procedure = require('./procedure')

const treatmentSchema = new mongoose.Schema({
    OwnerID : {
        type: String,
        required : true
    },
    PetName : {
        type: String,
        required : true
    },
    ProcedureID : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "procedure",
        required : true
    },
    Date : {
        type: Date,
        required : true
    },
    Notes : {
        type: String,
        required : true 
    },
    Payment : {
        type: Number,
        required : true 
    },
    Paid : {
        type: Boolean,
    }
});
module.exports = mongoose.model('treatment', treatmentSchema);