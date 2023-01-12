const express = require("express");
const route = express.Router();
const {newQrMark,updateQrMark,getQrMark}=require("../controllers/QrMarkingC")
route.post("/new",newQrMark);
route.get("/get/:qrcodeId",getQrMark)
route.put("/update/:qrencodedId",updateQrMark);
module.exports = route;