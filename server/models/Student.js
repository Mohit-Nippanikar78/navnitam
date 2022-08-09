const mongoose = require("mongoose");
const StudentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  rollNo: Number,
  email: String,
  class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
    default: null,
  },
  administrator: {
    type: Boolean,
    default: false,
  },
  lecAtt: [
    {
      subjectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject",
      },
      attCount: {
        type: Number,
        default: 0,
      },
    },
  ],
});
const Student = mongoose.model("Students", StudentSchema);

module.exports = Student;
