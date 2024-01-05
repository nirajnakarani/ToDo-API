// ----- mongoose -----

var mongoose = require("mongoose");


// ----- schema -----

var adminSchema = mongoose.Schema({
    username: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    userId: {
        type: Array,
        ref: "userdata"
    },
    taskId: {
        type: Array,
        ref: "taskdata"
    }
});


// ----- model -----

var admin = mongoose.model("admindata", adminSchema);


// ----- export -----

module.exports = admin