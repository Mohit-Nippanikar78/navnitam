const mongoose = require("mongoose");
const Subject = require("./Subject");
const AttendanceSchema = mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
  present: {
    type: Boolean,
    default: false,
  },
  date: String,
  createdAt: { type: Date, default: new Date() },
  startTime: String,
  endTime: String,
  subjectId: { type: mongoose.Schema.Types.ObjectId, ref: "Subject" },
});
const Attendance = mongoose.model("Attendance", AttendanceSchema);

const changeStream = Attendance.watch();
changeStream.on("change", async (next) => {
  
  await Attendance.deleteMany({
    createdAt: {
      $lte: new Date(new Date().getTime() - 14 * 24 * 60 * 60 * 1000),
    },
  }).exec();
});

module.exports = Attendance;
