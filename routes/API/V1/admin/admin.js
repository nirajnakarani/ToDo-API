// ----- express -----

var express = require("express");


// ----- routes -----

var routes = express.Router()


// ----- admin model -----

var admin = require("../../../../models/admin/admin")


// ----- controller -----

var adminController = require("../../../../controllers/API/V1/admin/adminController")


// ----- passport -----

var passport = require("passport")


// ----- login -----

routes.post("/login", adminController.login)


// ----- register -----

routes.post("/register", adminController.register)


// ----- add task -----

routes.post("/add_task", passport.authenticate("admin", { failureRedirect: "/admin/failLogin" }), adminController.add_task)


// ----- view task -----

routes.get("/view_task", passport.authenticate("admin", { failureRedirect: "/admin/failLogin" }), adminController.view_task)


// ----- fail login -----

routes.get("/failLogin", async (req, res) => {
    return res.status(400).json({ msg: "invalid login", status: 0 })
})


// ----- export -----

module.exports = routes