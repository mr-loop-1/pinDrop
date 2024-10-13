const { folderModel } = require("../models");

exports.getFolder = async (req, res) => {
  try {
    const data = await folderModel.getFolder({
      folderId: req.params.folderId,
      user: req.user,
    });
    res.status(200).json({
      folders: trimFolders(data.folders),
      files: trimFiles(data.files),
    });
  } catch (error) {}
};

exports.createFolder = async (req, res) => {
  try {
    await folderModel.createFolder({
      title: req.body.title,
      folderId: req.params.folderId,
      user: req.user,
    });
    res.status(200).json({ message: "SUCCESS_CREATE_FOLDER" });
  } catch (error) {}
};

exports.deleteFolder = async (req, res) => {
  try {
    await folderModel.deleteFolder({
      folderId: req.params.folderId,
      user: req.user,
    });
    res.status(200).json({ message: "DELETE_FOLDER_SUCCESS" });
  } catch (error) {}
};

const trimFolders = (folders) =>
  folders.map((folder) => ({
    id: folder.ulid,
    title: folder.title,
  }));

const trimFiles = (files) =>
  files.map((file) => ({
    id: file.cid,
    name: file.name,
    type: "json",
  }));
