const Notify = require("../models/Notify");

const getNotify = async (req, res) => {
  let { studentId } = req.params;
  try {
    let notifys = await Notify.find({ studentId })
      .populate("subjectId")
      .sort({ createdAt: -1 })
      .exec();

    res.send(notifys);
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
module.exports = { getNotify, addNotify,removeNotify };
