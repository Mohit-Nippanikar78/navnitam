const Subject = require("../models/Subject");
const Admin = require("../models/Admin");
const Student = require("../models/Student");
const addSubject = async (req, res) => {
  try {
    let subject = new Subject(req.body);
    let classs = await Admin.findById(req.body.admin);
    classs.students.map((item) => {
      Student.findByIdAndUpdate(
        item,
        {
          $push: { lecAtt: { subjectId: subject._id, attCount: 0 } },
        },
        function (error, success) {
          if (error) {
            console.log(error);
          } else {
            console.log("success");
          }
        }
      );
    });

    await subject.save();
    res.send(subject);
  } catch (error) {
    console.log(error);
  }
};
const updateSubject = async (req, res) => {
  try {
    await Subject.findByIdAndUpdate(req.body._id, req.body);
    res.send("done");
  } catch (error) {
    console.log(error);
  }
};
const getSubjects = async (req, res) => {
  try {
    let { classId } = req.params;
    if (req.query.count) {
      const subCount = await Subject.find({ admin: classId }).count();
      res.send({ subCount });
    } else if (req.query.name) {
      const subs = await Subject.find({ admin: classId });
      let subss = subs.map((item) => {
        let { subjectName } = item;
        return subjectName;
      });
      res.send(subss);
    } else {
      const subjects = await Subject.find({ admin: classId });
      res.send(subjects);
    }
  } catch (error) {
    console.log(error);
  }
};
const updateSubjectLecCon = async (req, res) => {
  try {
    Subject.updateOne(
      { _id: req.body.subjectId },
      { $inc: { lecCon: 1 } }
    ).exec();
    res.send("done");
  } catch (error) {
    console.log(error);
  }
};
const infoSubject = async (req, res) => {
  try {
    let sub = await Subject.findById(req.params.id);
    res.send(sub);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  addSubject,
  getSubjects,
  updateSubjectLecCon,
  infoSubject,
  updateSubject,
};
