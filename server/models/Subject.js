const mongoose = require("mongoose");
const SubjectSchema = mongoose.Schema({
  admin: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" }, 
  faculty: String,
  subjectCode: String,
  
});
const Subjects = mongoose.model("Subjects", SubjectSchema);
module.exports = Subjects;
