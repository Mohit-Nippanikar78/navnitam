const express = require("express");
const route = express.Router();
const {newQrMark,updateQrMark,getQrMark,getClassMark}=require("../controllers/QrMarkingC")
route.post("/new",newQrMark);
route.get("/get/:qrcodeId",getQrMark);
route.put("/update/:qrencodedId",updateQrMark);
route.get("/class/:classId",getClassMark);
module.exports = route;