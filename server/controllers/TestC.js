const Exam = require("../models/Exam");
const Test = require("../models/Test");
const Student = require("../models/Student");

const getUnfilledTests = async (req, res) => {
  let { studentId } = req.params;
  let student = await Student.findById(studentId);

  let exam = await Exam.find({ classId: student.class })
    .sort({ createdAt: -1 })
    .limit(1);
  if (exam.length == 0) res.send([]);
  try {
    let unfilled = await Test.find({
      studentId,
      earnM: -1,
      examId: exam[0]._id.toString(),
    })
      .populate("subjectId")
      .exec();

    let respond = unfilled.map((item) => {
      return {
        subjectName: item.subjectId.subjectName,
        totalM: item.totalM,
        _id: item._id,
      };
    });
    res.send(respond);
  } catch (error) {
    console.log(error);
  }
};
const editUnfilledTest = async (req, res) => {
  let { testId } = req.params;
  try {
    await Test.findByIdAndUpdate(testId, req.body);
    res.send("fhff");
  } catch (error) {
    console.log(error);
  }
};

module.exports = { editUnfilledTest, getUnfilledTests };
