const mongoose = require("mongoose");
const { Schema } = mongoose;

const AdminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  crName: {
    type: Schema.Types.ObjectId,
    ref: "Students",
  },
  students: [
    {
      type: Schema.Types.ObjectId,
      ref: "Students",
    },
  ],

  pendingStudents: [
    {
      type: Schema.Types.ObjectId,
      ref: "Students",
    },
  ],
  createdAt: {
    type: Date,
    default: new Date(),
  },

},{ toJSON: { virtuals:true } });
AdminSchema.virtual("studentsCount").get(function () {
  return this.students.length;
});
const Admin = mongoose.model("Admin", AdminSchema);

module.exports = Admin;
