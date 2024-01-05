// ----- user model -----

var user = require("../../../../models/user/user")


// ----- admin model -----

var admin = require("../../../../models/admin/admin")


// ----- task model -----

var task = require("../../../../models/task/task")


// ----- bcrypt -----

var bcrypt = require("bcrypt")


// ----- jwt -----

var jwtData = require("jsonwebtoken")


// ----- nodemailer -----

var nodemailer = require("nodemailer")


// ----- login -----

module.exports.login = async (req, res) => {
    try {

        var checkEmail = await user.findOne({ email: req.body.email });

        if (checkEmail) {
            if (await bcrypt.compare(req.body.password, checkEmail.password)) {
                var token = jwtData.sign({ data: checkEmail }, "User", { expiresIn: "1h" });
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

        var checkEmail = await user.findOne({ email: req.body.email });

        if (checkEmail) {
            return res.status(400).json({ msg: "email already exits", status: 0 })
        }
        else {
            if (req.body.password == req.body.confirm_pass) {
                const transporter = nodemailer.createTransport({
                    host: "smtp.gmail.com",
                    port: 465,
                    secure: true,
                    auth: {
                        // TODO: replace `user` and `pass` values from <https://forwardemail.net>
                        user: "nakaraniniraj87580@gmail.com",
                        pass: "lagqsepgtzjcshka",
                    },
                });

                const info = await transporter.sendMail({
                    from: 'nakaraniniraj87580@gmail.com', // sender address
                    to: req.body.email, // list of receivers
                    subject: "User ✔", // Subject line
                    html: `<b>Email : ${req.body.email}</b><br><b>Password : ${req.body.password}</b>`, // html body
                });

                req.body.password = await bcrypt.hash(req.body.password, 10);
                req.body.adminId = req.user.id;
                var adminData = await admin.findById(req.user.id)
                var insert = await user.create(req.body);
                adminData.userId.push(insert.id)
                if (insert) {
                    await admin.findByIdAndUpdate(req.user.id, { userId: adminData.userId })
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


// ----- view task -----

module.exports.view_task = async (req, res) => {
    try {
        var taskData = await task.find({ userId: req.user.id });
        if (taskData) {
            return res.status(400).json({ msg: "task are here", status: 1, taskData: taskData })
        }
        else {
            return res.status(400).json({ msg: "data not found", status: 0 })
        }
    }
    catch (err) {
        return res.status(400).json({ msg: err, status: 0 })
    }
}


// ----- active task -----

module.exports.active_task = async (req, res) => {
    try {
        var taskActive = await task.findById(req.query.id);
        taskActive.isStatus = "active";

        if (taskActive) {
            await task.findByIdAndUpdate(req.query.id, { isStatus: taskActive.isStatus })
            return res.status(400).json({ msg: "task active", status: 1, taskActive: taskActive })
        }
        else {
            return res.status(400).json({ msg: "task not active", status: 0 })
        }
    }
    catch (err) {
        return res.status(400).json({ msg: err, status: 0 })
    }
}


// ----- complete task -----

module.exports.complete_task = async (req, res) => {
    try {
        var taskComplete = await task.findById(req.query.id);
        taskComplete.isStatus = "complete";

        if (taskComplete) {
            await task.findByIdAndUpdate(req.query.id, { isStatus: taskComplete.isStatus })
            return res.status(400).json({ msg: "task complete", status: 1, taskComplete: taskComplete })
        }
        else {
            return res.status(400).json({ msg: "task not active", status: 0 })
        }
    }
    catch (err) {
        return res.status(400).json({ msg: err, status: 0 })
    }
}