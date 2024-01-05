// ----- admin model -----

var admin = require("../models/admin/admin");


// ----- user model -----

var user = require("../models/user/user");


// ----- passport -----

var passport = require("passport");


// ----- jwt stratagy -----

var jwtStrategy = require("passport-jwt").Strategy;


// ----- jwt extract -----

var jwtExtract = require("passport-jwt").ExtractJwt;


// ----- admin option -----

var admin_opt = {
    jwtFromRequest: jwtExtract.fromAuthHeaderAsBearerToken(),
    secretOrKey: "Admin"
}


// ----- user option -----

var user_opt = {
    jwtFromRequest: jwtExtract.fromAuthHeaderAsBearerToken(),
    secretOrKey: "User"
}


// ----- find admin data -----

passport.use("admin",new jwtStrategy(admin_opt, async (record, done) => {
    var checkAdmin = await admin.findById(record.data._id);
    if (checkAdmin) {
        return done(null, checkAdmin)
    }
    else {
        return done(null, false)
    }
}))


// ----- find user data -----

passport.use("user", new jwtStrategy(user_opt, async (record, done) => {
    var checkUser = await user.findById(record.data._id);
    if (checkUser) {
        return done(null, checkUser)
    }
    else {
        return done(null, false)
    }
}))


// ----- serialize -----

passport.serializeUser(async (user, done) => {
    return done(null, user.id)
})


// ----- deserialize -----

passport.deserializeUser(async (id, done) => {
    var adminData = await admin.findById(id);
    if (adminData) {
        return done(null, adminData)
    }
    else {
        return done(null, false)
    }
})


// ----- export -----

module.exports = passport