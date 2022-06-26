const mongoose = require('mongoose')

const petSchema = new mongoose.Schema({
    PetName : {
        type: String,
        required : true
    },
    Type : {
        type: String,
        required : true
    },
    OwnerID : {
        type: String,
        required : true
    }
});
module.exports = mongoose.model('pet', petSchema);