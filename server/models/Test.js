const mongoose = require("mongoose");
const TotalMark = require("./fffffff/TotalMarks");
const Student = require("./Student");
const TestSchema = mongoose.Schema({
  studentId: {
    type: mongoose.Types.ObjectId,
    ref: "Student",
  },
  subjectId: {
    type: mongoose.Types.ObjectId,
    ref: "Subject",
  },
  totalM: Number,
  earnM: { type: Number, default: -1 },
  percentM: Number,
  examId: {
    type: mongoose.Types.ObjectId,
    ref: "Exam",
  },
});
const Test = mongoose.model("Test", TestSchema);
const changeStream = Test.watch();
changeStream.on("change", async (next) => {
  if (next.operationType == "update") {
    let test = await Test.findById(next.documentKey._id);
    let student = await Student.findById(test.studentId);
    TotalMark.findOne({studentId: test.studentId,
      examId: test.examId,
      classId: student.class,}).then((ress)=>console.log(ress))
    await TotalMark.findOneAndUpdate(
      {
        studentId: test.studentId,
        examId: test.examId,
        classId: student.class,
      },
      {
        $inc: {
          totalM: test.totalM,
          gainM: test.earnM,
        },
      }
    ).exec();
  }
});
module.exports = Test;
