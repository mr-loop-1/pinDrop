const express = require("express");
const { fileController } = require("../controllers");
const upload = require("../utils/multer");
const { authMiddleware } = require("../middleware");
const { fileValidator } = require("../validators");

const router = express.Router();

app.post(
  "upload",
  authMiddleware.authenticateToken,
  upload.single("file"),
  fileController.upload
);
app.post(
  "download",
  authMiddleware.authenticateToken,
  fileController.downloadFile
);
app.delete(
  "delete",
  authMiddleware.authenticateToken,
  fileValidator.deleteFiles,
  fileController.deleteFiles
);

module.exports = router;
