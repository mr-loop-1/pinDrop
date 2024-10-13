const { folderModel } = require("../models");

exports.getFolder = async (req, res) => {
  console.log("🚀 ~ exports.getFolder= ~ req:", req.params);
  try {
    const data = await folderModel.getFolder({
      folderId: req.params.folderId,
      user: req.user,
      pinata: req.pinata,
    });
    console.log("🚀 ~ exports.getFolder= ~ data:", data);
    res.status(200).json({
      folders: trimFolders(data.folders),
      files: trimFiles(data.files),
    });
  } catch (error) {
    console.log("🚀 ~ exports.login= ~ err:", error);
    res.status(500).json({ error: `Login Error - ${error.message}` });
  }
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
