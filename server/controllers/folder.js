const { folderModel } = require("../models");

exports.getFolder = async (req, res) => {
  try {
    const data = await folderModel.getFolder({
      folderId: req.param.folderId,
    });
  } catch (error) {}
};

exports.createFolder = (req, res) => {};

exports.deleteFolder = (req, res) => {};
