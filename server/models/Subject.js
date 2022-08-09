const mongoose = require("mongoose");
const SubjectSchema = mongoose.Schema({
  subjectName: String,
  admin: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
  faculty: String,
  subjectCode: String,
  lecCon: {
    type: Number,
    default: 0,
  },
});
const Subject = mongoose.model("Subject", SubjectSchema);
module.exports = Subject;
