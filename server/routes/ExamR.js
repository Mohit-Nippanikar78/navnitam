const express = require("express");
const route = express.Router();
const { createExam, getExam } = require("../controllers/ExamC");
route.post("/create", createExam);
route.get("/exam/:examId", getExam);

module.exports = route;
