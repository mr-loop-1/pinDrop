const express = require("express");
const { authMiddleware } = require("../middleware");
const { userController } = require("../controllers");

const router = express.Router();

router.get(
  "/current-user",
  authMiddleware.authenticateToken,
  userController.getUser
);
// router.post("/login");

module.exports = router;
