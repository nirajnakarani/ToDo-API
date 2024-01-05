// ----- admin model -----

var admin = require("../../../../models/admin/admin")


// ----- user model -----

var user = require("../../../../models/user/user")


// ----- task model -----

var task = require("../../../../models/task/task")


// ----- bcrypt -----

var bcrypt = require("bcrypt")


// ----- jwt -----

var jwtData = require("jsonwebtoken")


// ----- login -----

module.exports.login = async (req, res) => {
    try {

        var checkEmail = await admin.findOne({ email: req.body.email });

        if (checkEmail) {
            if (await bcrypt.compare(req.body.password, checkEmail.password)) {
                var token = jwtData.sign({ data: checkEmail }, "Admin", { expiresIn: "1h" });
                return res.status(200).json({ msg: "log in success", status: 1, token: token })
            }
            else {
                return res.status(400).json({ msg: "invalid password", status: 0 })
            }

        }
        else {
            return res.status(400).json({ msg: "invalid email", status: 0 })
        }

    }
    catch (err) {
        return res.status(400).json({ msg: err, status: 0 })
    }
}


// ----- register -----

module.exports.register = async (req, res) => {
    try {

        var checkEmail = await admin.findOne({ email: req.body.email });

        if (checkEmail) {
            return res.status(400).json({ msg: "email already exits", status: 0 })
        }
        else {
            if (req.body.password == req.body.confirm_pass) {
                req.body.password = await bcrypt.hash(req.body.password, 10);

                var insert = await admin.create(req.body);
                if (insert) {
                    return res.status(200).json({ msg: "data insert", status: 1 })
                }
                else {
                    return res.status(400).json({ msg: "data not insert", status: 0 })
                }

            }
            else {
                return res.status(400).json({ msg: "pass not match", status: 0 })
            }
        }

    }
    catch (err) {
        return res.status(400).json({ msg: err, status: 0 })
    }
}


// ----- add task -----

module.exports.add_task = async (req, res) => {
    try {
        req.body.adminId = req.user.id
        req.body.isStatus = "pending";
        var insert = await task.create(req.body);

        var adminData = await admin.findById(req.user.id);
        adminData.taskId.push(insert.id)

        var userData = await user.findById(req.body.userId);
        userData.taskId.push(insert.id)

        if (insert) {
            await admin.findByIdAndUpdate(req.user.id, { taskId: adminData.taskId })
            await user.findByIdAndUpdate(req.body.userId, { taskId: userData.taskId })
            return res.status(200).json({ msg: "task added", status: 1 })
        }
        else {
            return res.status(400).json({ msg: "task not added", status: 0 })
        }

    }
    catch (err) {
        return res.status(400).json({ msg: err, status: 0 })
    }
}


// ----- view task -----

module.exports.view_task = async (req, res) => {
    try {
        var adminData = await admin.findById(req.user.id).populate("userId").exec();
        var taskData = await task.find({ adminId: req.user.id }).populate("userId").exec();

        if (adminData && taskData) {
            return res.status(200).json({ msg: "data here", status: 1, Data: adminData, taskData: taskData })
        }
        else {
            return res.status(400).json({ msg: "data not found", status: 0 })
        }


    }
    catch (err) {
        return res.status(400).json({ msg: err, status: 0 })
    }
}