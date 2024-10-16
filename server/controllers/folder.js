const { folderModel } = require("../models");

exports.getFolder = async (req, res) => {
  try {
    const data = await folderModel.getFolder({
      folderId: req.params.ulid,
      user: req.user,
      pinata: req.pinata,
    });
    res.status(200).json({
      folders: trimFolders(data.folders),
      files: trimFiles(data.files),
      folder: trimFolder(data.folder),
    });
  } catch (error) {
    res.status(500).json({ error: `Getting Error - ${error.message}` });
  }
};

exports.createFolder = async (req, res) => {
  try {
    await folderModel.createFolder({
      title: req.body.title,
      folderId: req.params.ulid,
      folderPath: req.body.folderPath,
      user: req.user,
      pinata: req.pinata,
    });
    res.status(200).json({ message: "SUCCESS_CREATE_FOLDER" });
  } catch (error) {
    res.status(500).json({ error: `Creating Error - ${error.message}` });
  }
};

exports.deleteFolder = async (req, res) => {
  try {
    await folderModel.deleteFolder({
      folderId: req.params.ulid,
      user: req.user,
      pinata: req.pinata,
    });
    res.status(200).json({ message: "DELETE_FOLDER_SUCCESS" });
  } catch (error) {
    res.status(500).json({ error: `Deleting folder Error - ${error.message}` });
  }
};

const trimFolders = (folders) =>
  folders.map((folder) => ({
    id: folder.ulid,
    title: folder.title,
  }));

const trimFiles = (files) =>
  files.map((file) => ({
    id: file.id,
    cid: file.cid,
    name: file.name,
    type: "json",
  }));

const trimFolder = (folder) => ({
  id: folder.ulid,
  parentId: folder.parentId,
  title: folder.title,
  path: folder.path,
});
