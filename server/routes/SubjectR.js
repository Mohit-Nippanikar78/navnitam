const express = require("express");
const {
  addSubject,
  getSubjects,
  updateSubjectLecCon,
  infoSubject,
  updateSubject,
} = require("../controllers/SubjectC");
const route = express.Router();
route.get("/info/:id", infoSubject);
route.get("/:classId", getSubjects);
route.post("/add", addSubject);
route.put("/update/lecCon", updateSubjectLecCon);
route.put("/update", updateSubject);

module.exports = route;
