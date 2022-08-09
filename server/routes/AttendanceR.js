const express = require("express");
const route = express.Router();
const {
  addAttendance,
  updateAttendance,
  totalSubjectLectures,
} = require("../controllers/AttendanceC.js");
route.post("/add", addAttendance);
route.put("/update", updateAttendance);
route.get("/totalSubjectLectures", totalSubjectLectures);
module.exports = route;
