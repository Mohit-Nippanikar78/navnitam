const mongoose = require("mongoose");
const TotalMarksSchema = mongoose.Schema({
  studentId: {
    type: mongoose.Types.ObjectId,
    ref: "Student",
  },
  examId: {
    type: mongoose.Types.ObjectId,
    ref: "Exam",
  },
  classId: {
    type: mongoose.Types.ObjectId,
    ref: "Admin",
  },
  totalM: { type: Number, default: 0 },
  gainM: { type: Number, default: 0 },
  percentage: { type: Number, default: 0 },
});
const TotalMark = mongoose.model("TotalMark", TotalMarksSchema);
const cha = TotalMark.watch();
cha.on("change", async (next) => {
  let test = await TotalMark.findById(next.documentKey._id);
  await TotalMark.findByIdAndUpdate(test._id, {
    percentage: Math.floor((test.gainM * 100) / test.totalM).toFixed(2),
  });
});
module.exports = TotalMark;
