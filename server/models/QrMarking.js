const mongoose = require("mongoose");
const moment = require("moment");
const QrMarkingSchema = new mongoose.Schema({
  sessionName: {
    type: String,
    default: moment(new Date()).format("lll"),
  },
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
