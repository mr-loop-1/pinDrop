const { body, param, validationResult } = require("express-validator");

exports.createFolder = [
  body("title")
    .isAlpha()
    .withMessage("Title must only contain alphbets")
    .isLength({ min: 1, max: 20 })
    .withMessage("Title must be between 1 and 20 characters"),

  param("folderId")
    .isAlphanumeric()
    .withMessage("Folder ulid must be alphanumeric"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

exports.getFolder = [
  param("folderId")
    .isAlphanumeric()
    .withMessage("Folder ulid must be alphanumeric")
    .optional(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

exports.deleteFolder = this.getFolder;
