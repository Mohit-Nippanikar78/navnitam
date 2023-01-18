const QrMarking = require("../models/QrMarking");
const Admin = require("../models/Admin");
const moment = require("moment");

const newQrMark = async (req, res) => {
  try {
    let qrmark = new QrMarking();
    let classs = await Admin.findById(req.body.classId);
    qrmark.students = classs.students.map((item) => {
      return { studentId: item._id, present: false };
    });
    qrmark.classId = req.body.classId;
    qrmark.sessionName = moment().format("lll");
    await qrmark.save();

    res.send(qrmark._id);
  } catch (error) {
    res.send(error);
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

    if (req.query?.update) {
      const tempStudents = sessionn.students.map((ele) => {
        let { studentId, present } = ele;
        return {
          studentId: studentId._id,

          present,
        };
      });
      res.send({ students: tempStudents });
    }
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
    let submitTime = new Date().getTime();
    let limitTime = new Date(createdAt).getTime() + 120000;
    res.send({
      sessionId: _id,
      sessionName,
      createdAt,
      students: tempStudents,
      activeQr: submitTime < limitTime,
    });
  } catch (error) {
    console.log(error);
  }
};
const getClassMark = async (req, res) => {
  try {
    let page = Number(req.query.page);
    let { classId } = req.params;

    let classQrs = await QrMarking.find({ classId })
      .sort({ createdAt: -1 })
      .skip(page * 10)
      .limit(10)
      .exec();
    let classNextQrs = await QrMarking.find({ classId })
      .sort({ createdAt: -1 })
      .skip((page + 1) * 10)

      .exec();
    let next = classNextQrs.length != 0 ? true : false;
    let upclassQrs = classQrs.map((item) => {
      let { _id, sessionName, createdAt } = item;
      let submitTime = new Date().getTime();
      let limitTime = new Date(createdAt).getTime() + 120000;

      return {
        qrcodeId: _id.toString(),
        sessionName,
        createdAt,
        activeQr: submitTime < limitTime,
      };
    });

    res.send({ qrs: upclassQrs, next });
  } catch (error) {
    res.send(error);
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

      let submitTime = new Date(req.body?.currentTiming).getTime();
      let limitTime = new Date(session.createdAt).getTime();
      // console.log(
      //   submitTime,
      //   limitTime,
      //   limitTime + 120000,
      //   submitTime < limitTime
      // );
      // console.log(req.body, session);
      if (
        new Date(req.body?.currentTiming).getTime() <
        new Date(session.createdAt).getTime() + 120000
      ) {
        // moment(session.createdAt.getTime()).add(2, "minutes").milliseconds()
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
module.exports = { newQrMark, updateQrMark, getQrMark, getClassMark };
