const mongoose = require("mongoose");
const NotifySchema = mongoose.Schema({
  type: String,
  absentDate: String,
  subjectId: { type: mongoose.Schema.Types.ObjectId, ref: "Subject" },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
  timing: String,
  examId:{type:mongoose.Types.ObjectId,ref:"Exam"},
  createdAt: { type: Date, default: new Date() },
});
const Notify = mongoose.model("Notify", NotifySchema);
module.exports = Notify;
