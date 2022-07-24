const { default: mongoose } = require("mongoose");
const Student = require("../models/Student");
const allStudents = async (req, res) => {
  let { classId } = req.body;
  try {
    let students = await Student.find({ class: classId });
    res.send(students);
  } catch (error) {
    console.log(error);
  }
};

const addStudent = async (req, res) => {
  let alreadyStudent = await Student.findOne({ email: req.body.email });
  if (alreadyStudent == null) {
    const student = await new Student(req.body);

    try {
      await student.save();
      res.send(student);
    } catch (error) {
      console.log(error);
    }
  } else {
    res.send(alreadyStudent);
  }
};
const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No post with id: ${id}`);

    const updatedStudent = req.body;
    await Student.findByIdAndUpdate(id, updatedStudent, { new: true });

    res.send(updatedStudent);
  } catch (error) {
    console.log(error);
  }
};
const getStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Student.findById(id);
    res.send(user);
  } catch (error) {
    console.log(error);
  }
};
module.exports = { addStudent, getStudent, updateStudent ,allStudents};
