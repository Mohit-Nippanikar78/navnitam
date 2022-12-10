const Attendance = require("../models/Attendance");
const Student = require("../models/Student");
const Notify = require("../models/Notify");
const Subject = require("../models/Subject");
const updateAttPer = require("../elements/UpdateAttPer");
const addAttendance = async (req, res) => {
  let { studentId, date, startTime, endTime, subjectId } = req.body;
  let lecAttAlready = await Student.find({
    _id: studentId,
    lecAtt: { $elemMatch: { subjectId } },
  });

  if (lecAttAlready.length == 0) {
    let sub = await Subject.findById(subjectId);
    Student.findByIdAndUpdate(
      studentId,
      {
        $push: {
          lecAtt: { subjectId, attCount: sub.lecCon - 1, attPer: 0 },
        },
      },
      function (error, success) {
        if (error) {
          console.log(error);
        } else {
          console.log("success");
        }
      }
    );
  }
  let already = await Attendance.find({
    studentId,
    date,
    startTime,
    endTime,
    subjectId,
  });

  if (already.length == 0) {
    try {
      let attend = new Attendance(req.body);
      let { present, _id } = attend;
      Student.find({ "lecAtt.attPer": { $exists: false } }).then((res) => {
        console.log(res);
      });
      if (present) {
        await Student.updateOne(
          { _id: studentId, "lecAtt.subjectId": subjectId },
          { $inc: { "lecAtt.$.attCount": 1 } }
        );
      } else {
        await Notify.insertMany({
          type: "absenty",
          absentDate: date,
          subjectId,
          studentId,
          timing: startTime + "-" + endTime,
        });
      }
      updateAttPer(studentId);

      await attend.save();
      res.send({ present, _id });
    } catch (error) {
      console.log(error);
    }
  } else {
    res.send("phelese he");
  }
};
const updateAttendance = async (req, res) => {
  let { id, present, studentId } = req.body;
  try {
    await Attendance.findByIdAndUpdate(id, { present });
    let attend1 = await Attendance.findById(id);
    let { subjectId, date, studentId, startTime, endTime } = attend1;

    if (present) {
      await Notify.findOneAndDelete({
        type: "absenty",
        absentDate: date,
        subjectId,
        studentId,
        timing: startTime + "-" + endTime,
      });

      await Student.updateOne(
        { _id: studentId, "lecAtt.subjectId": subjectId },
        { $inc: { "lecAtt.$.attCount": 1 } }
      );
    } else {
      await Student.updateOne(
        { _id: studentId, "lecAtt.subjectId": subjectId },
        { $inc: { "lecAtt.$.attCount": -1 } }
      );
    }
    updateAttPer(studentId);
    res.send("done updating");
  } catch (error) {
    console.log(error);
  }
};
const totalSubjectLectures = async (req, res) => {
  try {
    let { studentId, subjectId } = req.query;

    let result = await Attendance.find({
      studentId,
      subjectId,
    })
      .sort({ createdAt: -1 })
      .exec();

    let result1 = await result.map(({ date, startTime, endTime, present }) => {
      return {
        date,
        startTime,
        endTime,
        present,
      };
    });
    res.send(result1);
  } catch (error) {
    console.log(error);
  }
};
module.exports = { addAttendance, updateAttendance, totalSubjectLectures };
