const mongoose = require("mongoose");
const NotifySchema = mongoose.Schema({
  type: String,
  absentDate: Date,
  subjectId: { type: mongoose.Schema.Types.ObjectId, ref: "Subject" },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
  timing: String,
  createdAt: { type: Date, default: new Date() },
});
const Notify = mongoose.model("Notify", NotifySchema);
module.exports = Notify;
