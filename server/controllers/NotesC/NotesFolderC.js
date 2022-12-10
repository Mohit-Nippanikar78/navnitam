const NotesFolder = require("../../models/Notes/NotesFolder");
const NotesPdf= require("../../models/Notes/NotesPdf");

const addFolder = async (req, res) => {
  try {
    await NotesFolder.insertMany([req.body]);
    res.send("done bhai");
  } catch (error) {
    console.log(error);
  }
};
const getFolders = async (req, res) => {
  try {
    let { classId } = req.params;
    let subs = await NotesFolder.find({ classId });
    subs = subs.map((item) => {
      let { fname, fdesc, classId, _id, fcolor } = item;
      return { fname, fdesc, classId, _id, fcolor };
    });
    res.send(subs);
  } catch (error) {
    console.log(error);
  }
};
const getFolder = async (req, res) => {
  try {
    let { folderId } = req.params;
    let subs = await NotesFolder.findById(folderId);
    let { fname, fdesc, _id } = subs;
    res.send({ fname, _id, fdesc });
  } catch (error) {
    console.log(error);
  }
};
const deleteFolder = async (req, res) => {
  try {
    let { folderId } = req.params;
     await NotesPdf.deleteMany({folderId});
    await NotesFolder.findByIdAndDelete(folderId);
    res.send("subs");
  } catch (error) {
    console.log(error);
  }
};
const updateFolder = async (req, res) => {
  try {
    let { folderId } = req.params;
    await NotesFolder.findByIdAndUpdate(folderId, req.body);
    res.send("subs");
  } catch (error) {
    console.log(error);
  }
};
module.exports = { addFolder, getFolders, deleteFolder, updateFolder,getFolder };
