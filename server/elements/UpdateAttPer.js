const Student = require("../models/Student");
const Subject = require("../models/Subject");

function updateAttPer(studId) {
  Student.findById(studId).then((stud) => {
    stud.lecAtt.map(async (item) => {
      let sub = await Subject.findById(item.subjectId.toString());

      await Student.updateOne(
        { _id: stud._id, "lecAtt.subjectId": item.subjectId },
        {
          "lecAtt.$.attPer": Math.floor((item.attCount * 100) / sub.lecCon),
        }
      );
    });
  });
}
module.exports = updateAttPer;
