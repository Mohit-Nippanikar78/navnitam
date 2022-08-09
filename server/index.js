const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser")
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose
  .connect(
    "mongodb+srv://MohitNippanikar:mhtnipp77@cluster0.mwqucgz.mongodb.net/Class?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    app.listen(process.env.PORT || 3001, () => {
      console.log("Server running on 3001");
    });
  })
  .catch((err) => {
    console.log(err);
  });
app.use("/students", require("./routes/StudentsR"));
app.use("/admin", require("./routes/AdminR"));
app.use("/subjects", require("./routes/SubjectR"));
app.use("/attendance", require("./routes/AttendanceR"));
app.use("/notify", require("./routes/NotifyR"));
app.get("/", (req, res) => {
  res.send("v6 deployed ehahahahahahah");
});


