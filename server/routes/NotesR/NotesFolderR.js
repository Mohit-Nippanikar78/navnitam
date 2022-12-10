const express = require("express");
const { addFolder, getFolders,deleteFolder,getFolder ,updateFolder} = require("../../controllers/NotesC/NotesFolderC");
const route = express.Router();
route.post("/add",addFolder)
route.delete("/delete/:folderId",deleteFolder)
route.get("/class/:classId",getFolders)
route.get("/folder/:folderId",getFolder)
route.put("/update/:folderId",updateFolder)


module.exports = route;
