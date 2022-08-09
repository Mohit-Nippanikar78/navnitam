const express = require("express");
const { getNotify, addNotify } = require("../controllers/NotifyC");
const route = express.Router();
route.get("/student/:studentId", getNotify);
route.post("/add", addNotify);
module.exports = route;
