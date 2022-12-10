const mongoose = require("mongoose");
const Subject = require("./Subject");
const StudentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    profile: {
      type: String,
      default: "",
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
        attPer: {
          type: Number,
          default: 0,
        },
      },
    ],
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);
const Student = mongoose.model("Students", StudentSchema);

module.exports = Student;
