const express = require("express");
const {
  addSubject,
  getSubjects,
  updateSubjectLecCon,
  infoSubject,
  updateSubject,
} = require("../controllers/SubjectC");
const route = express.Router();
route.post("/add", addSubject);
route.put("/update/lecCon", updateSubjectLecCon);
route.get("/:classId", getSubjects);
route.get("/info/:id", infoSubject);
route.put("/update", updateSubject);

module.exports = route;
