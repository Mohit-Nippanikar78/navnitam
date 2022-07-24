const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");

app.use(cors());
app.use(express.json());
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
app.get("/",(req,res)=>{
  res.send("lfffhfhf lesss go da");
})