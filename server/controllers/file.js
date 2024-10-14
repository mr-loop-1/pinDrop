const { default: axios } = require("axios");
const { knex } = require("../database");

exports.downloadFile = async (req, res) => {
  try {
    const pinata = req.pinata;
    const fileCid = req.params.fileCid;

    const signedUrl = await pinata.gateways.createSignedURL({
      cid: fileCid,
      expires: 120,
    });
    // const fileUrl = `https://${req.user.gateway}/files/${fileCid}`;
    // const response = await axios({
    //   url: fileUrl,
    //   method: "GET",
    //   responseType: "blob",
    // });

    // // const file = await pinata.gateways.get(fileCid);
    // // console.log("🚀 ~ exports.downloadFile= ~ file:", file.data);
    // console.log("🚀 ~ exports.downloadFile= ~ response:", response);

    // res.set({
    //   "Content-Disposition": "attachment",
    //   // "Content-Type": file.contentType,
    // });

    res.status(200).json({ signedUrl });
  } catch (error) {
    res.status(500).json({ error: `Download file Error - ${error.message}` });
  }
};

// exports.downloadFile = async (req, res) => {
//   try {
//     const fileCid = req.params.fileCid;
//     const fileUrl = `https://${req.user.gateway}/files/${fileCid}`;
//     const response = await axios({
//       url: fileUrl,
//       method: "GET",
//       responseType: "stream",
//     });
//     // console.log("🚀 ~ exports.downloadFile= ~ response:", response);

//     res.set({
//       "Content-Disposition": "attachment",
//       "Content-Type": "application/pdf",
//     });

//     return response.data.pipe(res);
//   } catch (error) {
//     res.status(500).json({ error: `Download file Error - ${error.message}` });
//   }
// };

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
    res.status(500).json({ error: `File upload error - ${error.message}` });
  }
};

exports.deleteFiles = async (req, res) => {
  try {
    const pinata = req.pinata;
    const fileId = req.params.fileId;
    await pinata.files.delete([fileId]);
    res.status(200).json({ message: "DELETE_FILE_SUCCESS" });
  } catch (error) {
    res.status(500).json({ error: `Deleting file Error - ${error.message}` });
  }
};
