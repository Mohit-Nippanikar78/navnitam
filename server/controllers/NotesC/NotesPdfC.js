const NotesPdf = require("../../models/Notes/NotesPdf");
const NotesFolder = require("../../models/Notes/NotesFolder");
const Cloudinary = require("../../utils");
const addFile = async (req, res) => {
  try {
    if (req.body.folderId == "main") {
      let folders = await NotesPdf.find({ folderId: "main" });
      req.body.forder = folders.length + 1;
      await NotesPdf.insertMany([req.body]);
      res.send("success");
    } else {
      let folder = await NotesFolder.findById(req.body.folderId);
      req.body.forder = folder.files.length + 1;

      let filesInserted = await NotesPdf.insertMany([req.body]);
      folder.files = folder.files.concat(filesInserted[0]._id.toString());
      await folder.save();
      res.send("success");
    }
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};
const getFile = async (req, res) => {
  try {
    let { classId } = req.params;
    if (req.query?.main) {
      let pdfs = await NotesPdf.find({ classId, folderId: "main" })
        .sort("forder")
        .exec();

      res.send(pdfs);
    }
  } catch (error) {
    console.log(error);
  }
};
const getFolderFile = async (req, res) => {
  try {
    let { folderId } = req.params;

    let pdfs = await NotesPdf.find({ folderId }).sort("forder").exec();

    res.send(pdfs);
  } catch (error) {
    console.log(error);
  }
};
const getFileId = async (req, res) => {
  try {
    let { fileId } = req.params;

    let pdfs = await NotesPdf.findById(fileId);

    res.send(pdfs);
  } catch (error) {
    console.log(error);
  }
};
const deleteFile = async (req, res) => {
  try {
    let { fileId } = req.params;
    let fileTemp = await NotesPdf.findById(fileId);
    if (fileTemp.folderId !== "main") {
      NotesFolder.findByIdAndUpdate(
        fileTemp.folderId,
        {
          $pull: { files: fileTemp._id },
        },
        function (error, success) {
          if (error) {
            console.log("error");
          } else {
            console.log("success");
          }
        }
      );
    }
    await Cloudinary.uploader.destroy(fileTemp.public_id);
    await NotesPdf.findByIdAndDelete(fileId);

    res.send("done");
  } catch (error) {
    console.log(error);
  }
};
const updateFile = async (req, res) => {
  try {
    let { fileId } = req.params;
    await NotesPdf.findByIdAndUpdate(fileId, req.body);
    res.send("subs");
  } catch (error) {
    console.log(error);
  }
};
const reorderFiles = async (req, res) => {
  try {
    let { files } = req.body;
    console.log(files);
    files.map(async (fileId, index) => {
      await NotesPdf.findByIdAndUpdate(fileId, { forder: index + 1 });
    });
    res.send("Hogya bhae");
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  addFile,
  getFile,
  deleteFile,
  getFolderFile,
  updateFile,
  getFileId,
  reorderFiles,
};
