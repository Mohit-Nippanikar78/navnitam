const Exam = require("../models/Exam");
const Notify = require("../models/Notify");
const Admin = require("../models/Admin");
const Test = require("../models/Test");
const SubjectExam = require("../models/fffffff/SubjectExam");
const Student = require("../models/Student");
const TotalMark = require("../models/fffffff/TotalMarks");

const createExam = async (req, res) => {
  try {
    let { testName, tempSub, classId, totalM } = req.body;
    let already = await Exam.find({ testName, classId });
    if (already.length == 0) {
      let exams = new Exam({
        testName,
        classId,
        subjects: tempSub,
      });
      exams.save();
      await tempSub.map(async (item) => {
        await SubjectExam.insertMany({
          subjectId: item.subId,
          examId: exams._id,
          classId,
        });
      });
      let classs = await Admin.findById(classId);
      classs.students.map(async (stud) => {
        let student = await Student.findById(stud);
        let alreadyTotal = await TotalMark.find({
          studentId: stud,
          examId: exams._id,
          classId: student.class,
        });
        if (alreadyTotal.length == 0) {
          await TotalMark.insertMany({
            studentId: stud,
            examId: exams._id,
            classId: student.class,
          });
        }
        await Notify.insertMany({
          type: "ExamAdded",
          studentId: stud,
          examId: exams._id,
          subjects: tempSub,
        });
        tempSub.map(async (item) => {
          await Test.insertMany({
            studentId: stud,
            subjectId: item,
            totalM,
            examId: exams._id,
            classId,
          });
        });
      });
    }

    res.send("hahah");
  } catch (error) {
    console.log(error);
  }
};
const getExam = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
  }
};
module.exports = { createExam, getExam };
