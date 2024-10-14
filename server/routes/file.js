const express = require("express");
const { fileController } = require("../controllers");
const upload = require("../utils/multer");
const { authMiddleware } = require("../middleware");
const { fileValidator } = require("../validators");

const router = express.Router();

router.post(
  "/upload",
  authMiddleware.authenticateToken,
  upload.single("file"),
  fileController.uploadFile
);
// router.post(
//   "/:download",
//   authMiddleware.authenticateToken,
//   fileController.downloadFile
// );
// router.delete(
//   "/:id",
//   authMiddleware.authenticateToken,
//   fileValidator.deleteFiles,
//   fileController.deleteFiles
// );

module.exports = router;
