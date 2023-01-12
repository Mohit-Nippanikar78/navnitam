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
    qrmark.sessionName = req.body?.sessionName;

    await qrmark.save();

    res.send(qrmark._id);
  } catch (error) {
    console.log(error);
  }
};
const getQrMark = async (req, res) => {
  try {
    if (req.query?.sessionName) {
      let sessionNam = await QrMarking.findById(req.params.qrcodeId);
      console.log(sessionNam);
      res.send({ sessionName: sessionNam.sessionName });
    }
    let sessionn = await QrMarking.findById(req.params.qrcodeId)
      .populate({ path: "students", populate: { path: "studentId" } })
      .exec();
    const tempStudents = sessionn.students.map((ele) => {
      let { studentId, _id, present } = ele;
      return {
        studentId: studentId._id,
        name: studentId.name,
        rollno: studentId.rollNo,
        present,
      };
    });
    tempStudents.sort((a, b) => {
      return a.rollno - b.rollno;
    });

    let { _id, sessionName, createdAt } = sessionn;
    res.send({
      sessionId: _id,
      sessionName,
      createdAt,
      students: tempStudents,
    });
  } catch (error) {
    console.log(error);
  }
};
const updateQrMark = async (req, res) => {
  try {
    if (req.query?.sessionName) {
      await QrMarking.findByIdAndUpdate(req.params.qrencodedId, {
        sessionName: req.body.sessionName,
      });
      res.send("session name updated");
    } else if (req.query?.override) {
      await QrMarking.updateMany(
        {
          _id: req.params.qrencodedId,
          "students.studentId": req.body.studentId,
        },
        { $set: { "students.$.present": req.body?.present } }
      ).then(() => {
        console.log("updated");
      });
      res.send("done");
    } else if (req.query?.verify) {
      let session = await QrMarking.findById(req.params.qrencodedId);

      if (
        new Date(req.body?.currentTiming).getTime() <
        moment(session.createdAt.getTime()).add(2, "minutes").milliseconds()
      ) {
        await QrMarking.updateMany(
          {
            _id: req.params.qrencodedId,
            "students.studentId": req.body.studentId,
          },
          { $set: { "students.$.present": req.body?.present } }
        ).then(() => {
          console.log("updated");
        });
        res.send("done");
      } else {
        res.send("reject");
      }
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports = { newQrMark, updateQrMark, getQrMark };
