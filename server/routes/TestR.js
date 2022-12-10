const expree = require("express");
const { getUnfilledTests, editUnfilledTest } = require("../controllers/TestC");
const route = expree.Router();
route.get("/recent/unfilled/:studentId", getUnfilledTests);
route.put("/recent/unfilled/test/:testId", editUnfilledTest);
module.exports = route;
