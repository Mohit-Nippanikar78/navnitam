const express = require("express");
const route = express.Router();
const {
  addStudent,
  updateStudent,
  getStudent,
  allStudents,
  getSubjectsLecAtt,
} = require("../controllers/StudentsC.js");
route.post("/add", addStudent);
route.put("/edit/:id", updateStudent);
route.get("/:id", getStudent);
route.get("/class/:classId", allStudents);
module.exports = route;
