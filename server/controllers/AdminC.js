const { default: mongoose } = require("mongoose");
const Admin = require("../models/Admin");
const Student = require("../models/Student");

const addAdmin = async (req, res) => {
  const admin = await new Admin(req.body);
  try {
    await admin.save();
    res.send(admin);
  } catch (error) {
    console.log(error);
  }
};
const getAdmins = async (req, res) => {
  try {
    let mo = await Admin.find().populate("crName");

    res.send(mo);
  } catch (error) {
    console.log(error);
  }
};
const getAllAdminPendingStudents = async (req, res) => {
  try {
    let mo = await Admin.findById(req.params.id)
      .populate("pendingStudents")
      .exec();
    res.send(mo);
  } catch (error) {
    console.log(error);
  }
};
const updateAdminPendingStudents = async (req, res) => {
  let present = await Admin.find({
    _id: req.body.classId,
    pendingStudents: { $in: [req.body.studentId] },
  });
  if (present.length == 0) {
    try {
      Admin.findByIdAndUpdate(
        req.body.classId,
        {
          $push: { pendingStudents: req.body.studentId },
        },
        function (error, success) {
          if (error) {
            console.log(error);
          } else {
            console.log("success");
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  } else {
    res.send("Already Applied");
  }
};
const removeAdminPendingStudents = async (req, res) => {
  try {
    Admin.findByIdAndUpdate(
      req.body.classId,
      {
        $pull: { pendingStudents: req.body.studentId },
      },
      function (error, success) {
        if (error) {
          console.log(error);
        } else {
          console.log("success");
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
  res.send("donelol");
};
const updateAdminStudents = async (req, res) => {
  let Already = await Admin.find({
    _id: req.body.classid,
    students: { $in: [req.body.studentId] },
  });
  if (Already.length == 0) {
  
    try {
      Admin.findByIdAndUpdate(
        req.body.classId,
        {
          $push: { students: req.body.studentId },
        },
        function (error, success) {
          if (error) {
            console.log(error);
          } else {
            console.log(success);
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  }
  res.send("done");
};
const getAdmin = async (req, res) => {
  let { adminId } = req.params;

  try {
    if (req.query?.students) {
      let adminn = await Admin.findById(adminId).populate("students").exec();
      res.send(adminn.students);
    } else {
      let adminn = await Admin.findById(adminId);
      res.send(adminn);
    }
  } catch (error) {
    console.log(error);
  }
};
const removeAdminStudents = async (req, res) => {
  let { classId, studentId } = req.body;
  try {
    await Admin.findByIdAndUpdate(classId, { $pull: { students: studentId } });
    await Student.findByIdAndUpdate(studentId, { class: null });
    res.send("adjddhdh");
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  getAllAdminPendingStudents,
  addAdmin,
  getAdmins,
  getAdmin,
  updateAdminPendingStudents,
  removeAdminPendingStudents,
  updateAdminStudents,
  removeAdminStudents,
};
