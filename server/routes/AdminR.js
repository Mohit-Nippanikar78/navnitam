const express = require("express");
const {
  addAdmin,
  getAdmins,
  updateAdminPendingStudents,
  removeAdminPendingStudents,
  getAllAdminPendingStudents,
  updateAdminStudents
} = require("../controllers/AdminC");
const route = express.Router();
route.post("/add", addAdmin);
route.get("/all", getAdmins);



route.put("/students/add",updateAdminStudents)
route.put("/pendingStudents/add", updateAdminPendingStudents);
route.put("/pendingStudents/remove", removeAdminPendingStudents);
route.get("/pendingStudents/:id", getAllAdminPendingStudents);
module.exports = route;
