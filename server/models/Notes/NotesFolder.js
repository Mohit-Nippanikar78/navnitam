const mongoose = require("mongoose");
const { Schema } = mongoose;

const NotesFolderSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
  },
  fdesc: {
    type: String,
    required: true,
  },
  fcolor:{
    type:String,
    default:"bg-indigo-500"
  }
,
  files: [
    {
      type: Schema.Types.ObjectId,
      ref: "NotesPdf",
    },
  ],
  classId: {
    type: Schema.Types.ObjectId,
    ref: "Admin",
  },
});

const NotesFolder = mongoose.model("NotesFolder", NotesFolderSchema);

module.exports = NotesFolder;
