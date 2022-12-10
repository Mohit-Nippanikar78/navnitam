const mongoose = require("mongoose");
const { Schema } = mongoose;

const NotesPdfSchema = new mongoose.Schema({
  fileUrl: {
    type: String,
    required: true,
  },
  fname: {
    type: String,
    required: true,
  },
  fsize: {
    type: String,
    default: "0mb",
  },
  ftype: {
    type: String,
    default: "pdf",
  },
  classId: {
    type: Schema.Types.ObjectId,
    ref: "Admin",
  },
  folderId: {
    type: String,
    default: "main",
  },
  public_id: {
    type: String,
    default: "main",
  },
  forder: {
    type: Number,
    default: 1,
  },
});

const NotesPdf = mongoose.model("NotesPdf", NotesPdfSchema);

module.exports = NotesPdf;
