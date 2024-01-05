// ----- mongoose -----

var mongoose = require("mongoose");


// ----- schema -----

var taskSchema = mongoose.Schema({
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "admindata",
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userdata",
        required: true
    },
    task: {
        type: String
    },
    category: {
        type: String
    },
    isStatus: {
        type: String
    }
});


// ----- model -----

var task = mongoose.model("taskdata", taskSchema);


// ----- export -----

module.exports = task