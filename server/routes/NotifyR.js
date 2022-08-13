const express = require("express");
const {
  getNotify,
  addNotify,
  removeNotify,
} = require("../controllers/NotifyC");
const route = express.Router();
route.get("/student/:studentId", getNotify);
route.delete("/remove/:notifyId", removeNotify);
route.post("/add", addNotify);
module.exports = route;
