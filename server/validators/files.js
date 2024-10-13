const { body, validationResult } = require("express-validator");

exports.uploadFile = [
  body("fileName")
    .isString()
    .withMessage("Filename must be a string")
    .isLength({ min: 1, max: 50 })
    .withMessage("Filename must be between 1 and 50 char"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

exports.downloadFile = this.uploadFile;
exports.deleteFile = this.deleteFile;
