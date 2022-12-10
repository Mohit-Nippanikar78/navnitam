const express = require("express");
const route = express.Router();
const {
  addFile,
  getFile,
  getFolderFile,
  getFileId,
  deleteFile,
  updateFile,
  reorderFiles,
} = require("../../controllers/NotesC/NotesPdfC");
route.post("/new", addFile);
route.put("/edit/:fileId", updateFile);
route.get("/class/:classId", getFile);
route.get("/folder/:folderId", getFolderFile);
route.get("/file/:fileId", getFileId);
route.delete("/delete/:fileId", deleteFile);
route.post("/reorder",reorderFiles)

module.exports = route;
