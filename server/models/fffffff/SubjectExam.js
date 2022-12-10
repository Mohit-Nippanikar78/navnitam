const mongoose = require("mongoose");
const SubjectExamSchema = mongoose.Schema({
  subjectId: {
    type: mongoose.Types.ObjectId,
    ref: "Subject",
  },
  examId: {
    type: mongoose.Types.ObjectId,
    ref: "Exam",
  },

  classId: {
    type: mongoose.Types.ObjectId,
    ref: "Admin",
  },
  
  toppers: [
    {
      testId: {
        type: mongoose.Types.ObjectId,
        ref: "Test",
      },
      tag: String,
    },
  ],
});
const SubjectExam = mongoose.model("SubjectExam", SubjectExamSchema);

module.exports = SubjectExam;
