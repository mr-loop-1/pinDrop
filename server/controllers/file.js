const { knex } = require("../database");

exports.downloadFile = (req, res) => {};

exports.uploadFile = async (req, res) => {
  try {
    const folderId = req.body.folderId;
    const pinata = req.pinata;
    const user = req.user;
    let folder;

    if (!folderId) {
      folder = await knex("folders")
        .where("userId", user.ulid)
        .whereNull("parentId")
        .first();
    } else {
      folder = await knex("folders")
        .where("userId", user.ulid)
        .where("ulid", folderId)
        .first();
    }

    const blob = new Blob([req.file.buffer], { type: req.file.mimetype });
    const file = new File([blob], req.file.originalname, {
      type: req.file.mimetype,
    });

    await pinata.upload.file(file).group(folder.groupId);
    return res.status(200).json({ message: "File uploaded success" });
  } catch (error) {
    console.log("🚀 ~ exports.login= ~ err:", error);
    res.status(500).json({ error: `File upload error - ${error.message}` });
  }
};

exports.deleteFiles = async (req, res) => {
  try {
    const pinata = req.pinata;
    const fileId = req.params.fileId;
    console.log("🚀 ~ exports.deleteFiles ~ fileId:", fileId);
    await pinata.files.delete([fileId]);
    res.status(200).json({ message: "DELETE_FILE_SUCCESS" });
  } catch (error) {
    console.log("🚀 ~ exports.login= ~ err:", error);
    res.status(500).json({ error: `Deleting file Error - ${error.message}` });
  }
};
