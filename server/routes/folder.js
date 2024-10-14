const express = require("express");
const { authMiddleware } = require("../middleware");
const { folderValidator } = require("../validators");
const { folderController } = require("../controllers");

const router = express.Router();

router.get(
  "/:ulid",
  authMiddleware.authenticateToken,
  folderValidator.getFolder,
  folderController.getFolder
);

router.get(
  "",
  authMiddleware.authenticateToken,
  folderValidator.getFolder,
  folderController.getFolder
);

router.post(
  "/:ulid",
  authMiddleware.authenticateToken,
  folderValidator.createFolder,
  folderController.createFolder
);

router.post(
  "",
  authMiddleware.authenticateToken,
  folderValidator.createFolder,
  folderController.createFolder
);

router.delete(
  "/:ulid",
  authMiddleware.authenticateToken,
  folderValidator.deleteFolder,
  folderController.deleteFolder
);

module.exports = router;
