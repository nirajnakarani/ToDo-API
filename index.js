// ----- express -----

var express = require("express");


// ----- server -----

var app = express()


// ----- port -----

var port = 8888;


// ----- db -----

var db = require("./configs/mongoose");


// ----- encoded -----

app.use(express.urlencoded());


// ----- passport -----

var passport = require("passport");


// ----- passport jwt -----

var passportJwt = require("./configs/passport-jwt");


// ----- session -----

var session = require("express-session");


// ----- session object -----

app.use(session({
    name: "niraj",
    secret: "niraj",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 100
    }
}))


// ----- passport initilization -----

app.use(passport.initialize())


// ----- passport session -----

app.use(passport.session())


// ----- admin -----

app.use("/admin", require("./routes/API/V1/admin/admin"))


// ----- user -----

app.use("/user",require("./routes/API/V1/user/user"))


// ----- connection -----

app.listen(port, (err) => {
    err ? console.log(err) : console.log(`server running on ${port}`)
})