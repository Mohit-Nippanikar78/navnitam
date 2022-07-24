const mongoose = require("mongoose");
const AttendanceSchema = mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
  present: {
    type: Boolean,
    default: false,
  },
  date: Date(),
  time: String,
  subject: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
});
const Attendance = mongoose.model("Attendance", AttendanceSchema);
module.exports = Attendance;
