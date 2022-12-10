const express = require("express");
const route = express.Router();
const {newQrMark,updateQrMark}=require("../controllers/QrMarkingC")
route.post("/new",newQrMark);
route.put("/update/:qrencodedId",updateQrMark);
module.exports = route;