// ----- mongoose -----

var mongoose = require("mongoose");


// ----- create db -----

mongoose.connect("mongodb://127.0.0.1/TaskApi");


// ----- db -----

var db = mongoose.connection;


// ----- connect -----

db.once("open", (err) => {
    err ? console.log(err) : console.log("db connected")
})


// ----- export -----

module.exports = db