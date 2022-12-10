const mongoose = require("mongoose");
const ExamSchema = mongoose.Schema({
  subjects: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Subject",
    },
  ],
  classId: {
    type: mongoose.Types.ObjectId,
    ref: "Admin",
  },
  testName: String,
  toppers: [
    {
      testId: {
        type: mongoose.Types.ObjectId,
        ref: "Test",
      },
      tag: String,
    },
  ],
  createdAt: { type: Date, default: new Date() },
});
const Exam = mongoose.model("Exam", ExamSchema);
module.exports = Exam;
