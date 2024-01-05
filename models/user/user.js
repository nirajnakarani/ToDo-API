// ----- mongoose -----

var mongoose = require("mongoose");


// ----- schema -----

var userSchema = mongoose.Schema({
    username: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "admindata",
        required: true
    },
    taskId: {
        type: Array,
        ref:"taskdata"
    }
});


// ----- model -----

var user = mongoose.model("userdata", userSchema);


// ----- export -----

module.exports = user