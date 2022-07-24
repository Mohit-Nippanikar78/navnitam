const express = require("express");
const route = express.Router();
const {
  addStudent,
  updateStudent,
  getStudent,
  allStudents
} = require("../controllers/StudentsC.js");
route.post("/add", addStudent);
route.put("/edit/:id", updateStudent);
route.get("/:id", getStudent);
route.get("/",allStudents)
module.exports = route;
