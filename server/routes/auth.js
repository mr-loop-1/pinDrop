const express = require("express");
const { authValidator } = require("../validators");
const { authController } = require("../controllers");

const router = express.Router();

router.post(
  "/register",
  authValidator.validateRegister,
  authController.register
);
router.post("/login", authValidator.validateLogin, authController.login);

module.exports = router;
