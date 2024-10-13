const express = require("express");

const router = express.Router();

router.get("/current-user");
router.post("/login");

module.exports = router;
