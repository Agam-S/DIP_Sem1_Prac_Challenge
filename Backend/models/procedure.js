const mongoose = require('mongoose')

const procedureSchema = new mongoose.Schema({
    Description : {
        type: String,
        required : true
    },
    Price : {
        type: Number,
        required : true
    }
});
module.exports = mongoose.model('procedure', procedureSchema);