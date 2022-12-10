const Notify = require("../models/Notify");
const Subject = require("../models/Subject");

const getNotify = async (req, res) => {
  let { studentId } = req.params;
  try {
    let notifys = await Notify.find({ studentId })
      .populate(["subjectId", "examId"])

      .sort({ createdAt: -1 })
      .exec();
    Promise.all(
      notifys.map(async (item) => {
        let subjects;
        if (item.type == "ExamAdded") {
          await Promise.all(
            item.examId.subjects.map(async (item) => {
              let sub = await Subject.findById(item);
              return await sub.subjectName;
            })
          ).then(async (reso) => {
            subjects = await reso.join(", ");
          });
        }
        return {
          _id: item._id,
          type: item?.type,
          absentDate: item?.absentDate,
          subjectName: item?.subjectId?.subjectName,
          timing: item?.timing,
          createdAt: item.createdAt,
          examName: item?.examId?.testName,
          subjects,
        };
      })
    ).then(async (filtered) => {
      await Promise.all(
        filtered.map((item) => {
          let str = JSON.stringify(item);
          let obj = JSON.parse(str);
          return obj;
        })
      ).then((reso) => {
        res.send(reso);
      });
    });
  } catch (error) {
    console.log(error);
  }
};
const addNotify = async (req, res) => {
  try {
    let notified = new Notify(req.body);
    notified.save();
    res.send(notified);
  } catch (error) {
    console.log(error);
  }
};
const removeNotify = async (req, res) => {
  try {
    await Notify.findByIdAndDelete(req.params.notifyId);
    res.send("deleted");
  } catch (error) {
    console.log(error);
  }
};
module.exports = { getNotify, addNotify, removeNotify };
