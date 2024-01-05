// ----- express -----

var express = require("express");


// ----- routes -----

var routes = express.Router()


// ----- user model -----

var user = require("../../../../models/user/user")


// ----- task model -----

var user = require("../../../../models/user/user")


// ----- controller -----

var userController = require("../../../../controllers/API/V1/user/userController")


// ----- passport -----

var passport = require("passport")


// ----- login -----

routes.post("/login", userController.login)


// ----- register -----

routes.post("/register", passport.authenticate("admin", { failureRedirect: "/admin/failLogin" }), userController.register)


// ----- view task -----

routes.get("/view_task", passport.authenticate("user", { failureRedirect: "/user/failLogin" }), userController.view_task)


// ----- active task -----

routes.put("/active_task", passport.authenticate("user", { failureRedirect: "/user/failLogin" }), userController.active_task)


// ----- complete task -----

routes.put("/complete_task", passport.authenticate("user", { failureRedirect: "/user/failLogin" }), userController.complete_task)


// ----- fail login -----

routes.get("/failLogin", async (req, res) => {
    return res.status(400).json({ msg: "invalid login", status: 0 })
})


// ----- export -----

module.exports = routes