const mongoose = require('mongoose')

const ownerSchema = new mongoose.Schema({
    Surname : {
        type: String,
        required : true
    },
    Firstname : {
        type: String,
        required : true
    },
    Phone : {
        type: String,
        required : true
    },
    Email : {
        type: String,
        required : true
    },
    Password : {
        type: String,
        required : true
    },
    Role : {
        type: String,
        required : true,
        default : "user"
    }
});
module.exports = mongoose.model('owner', ownerSchema);