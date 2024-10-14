const express = require("express");
const { fileController } = require("../controllers");
const upload = require("../utils/multer");
const { authMiddleware } = require("../middleware");
const { fileValidator } = require("../validators");

const router = express.Router();

router.post(
  "/upload",
  authMiddleware.authenticateToken,
  (req, res, next) => {
    upload.single("file")(req, res, (err) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      next();
    });
  },
  // upload.single("file"),
  fileController.uploadFile
);
// router.post(
//   "/:download",
//   authMiddleware.authenticateToken,
//   fileController.downloadFile
// );
router.delete(
  "/:fileId",
  authMiddleware.authenticateToken,
  // fileValidator.deleteFile,
  fileController.deleteFiles
);

module.exports = router;
