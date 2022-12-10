const { default: mongoose, mongo } = require("mongoose");
const Student = require("../models/Student");
const allStudents = async (req, res) => {
  let { classId } = req.params;
  try {
    let students = await Student.find({ class: classId }).sort({ rollNo: 1 });
    if (req.query?.onlyIds) {
      let tempStus = students.map((item) => {
        return item._id;
      });
      res.send(tempStus);
    } else {
      let tempStus = students.map((item) => {
        let { _id, rollNo, name } = item;
        return { _id, rollNo, name };
      });
      res.send(tempStus);
    }
  } catch (error) {
    console.log(error);
  }
};

const addStudent = async (req, res) => {
  let alreadyStudent = await Student.find({ email: req.body.email });
  if (alreadyStudent.length == 0) {
    const student = new Student(req.body);

    try {
      await student.save();
      res.send(student);
    } catch (error) {
      console.log(error);
    }
  } else {
    res.send(alreadyStudent[0]);
  }
};
const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No post with id: ${id}`);

    const updatedStudent = req.body;
    await Student.findByIdAndUpdate(id, updatedStudent);

    res.send(updatedStudent);
  } catch (error) {
    console.log(error);
  }
};
const getStudent = async (req, res) => {
  try {
    const { id } = req.params;
    if (req.query?.lecAtt) {
      const user = await Student.findById(id).populate("lecAtt").exec();
      let lecAttSub = user.lecAtt.find((item) => {
        return item.subjectId.toString() === req.query.lecAtt;
      });

      res.send({
        attCount: lecAttSub?.attCount,
        attPer: lecAttSub?.attPer,
      });
    } else if (req.query?.info) {
      const user = await Student.findById(id);
      let { name, rollNo } = user;
      res.send({ name, rollNo });
    } else if (req.query?.lecAttCount) {
      const user = await Student.findById(id).populate("lecAtt").exec();
      let lecAttCount = 0;
      user.lecAtt.map((item) => {
        lecAttCount += item.attCount;
        return;
      });
      res.send({ lecAttCount });
    } else if (req.query?.className) {
      const user = await Student.findById(id).populate("class").exec();
      let { _id, name, email, administrator, rollNo } = user;
      res.send({
        _id,
        name,
        email,
        administrator,
        rollNo,
        className: user.class.name,
      });
    } else {
      const { id } = req.params;
      const user = await Student.findById(id);
      res.send(user);
    }
  } catch (error) {
    console.log(error);
  }
};
const getSubjectsLecAtt = async (req, res) => {
  try {
    // let sub = await Student
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  addStudent,
  getStudent,
  updateStudent,
  allStudents,
  getSubjectsLecAtt,
};
