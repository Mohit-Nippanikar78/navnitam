const QrMarking = require("../models/QrMarking");
const Admin = require("../models/Admin");

const newQrMark = async (req, res) => {
  try {
    let qrmark = new QrMarking();
    let classs = await Admin.findById(req.body.classId);
    qrmark.students = classs.students.map((item) => {
      return { studentId: item._id, present: false };
    });
    qrmark.classId = req.body.classId;
    qrmark.save();

    res.send(qrmark._id);
  } catch (error) {
    console.log(error);
  }
};
const updateQrMark = async (req, res) => {
  try {
    await QrMarking.updateMany(
      { _id: req.params.qrencodedId, "students.studentId": req.body.studentId },
      { $set: { "students.$.present": true } }
    )
    res.send("done");
  } catch (error) {
    console.log(error);
  }
};
module.exports = { newQrMark, updateQrMark };
