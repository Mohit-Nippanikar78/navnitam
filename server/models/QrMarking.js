const mongoose = require("mongoose");
const QrMarkingSchema = new mongoose.Schema({
  sessionName: String,
  students: [
    {
      studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Students",
      },
      present: {
        type: Boolean,
        default: false,
      },
    },
  ],
  classId: {
    type: mongoose.Types.ObjectId,
    ref: "Admin",
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});
const QrMarking = mongoose.model("QrMarking", QrMarkingSchema);
module.exports = QrMarking;
