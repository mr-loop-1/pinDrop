const { body, param, validationResult } = require("express-validator");

exports.createFolder = [
  body("title")
    .isAlphanumeric()
    .withMessage("Name must only contain alphanumeric (no spaces)")
    .isLength({ min: 1, max: 20 })
    .withMessage("Name must be between 1 and 30 characters"),

  // param("folderId") // this is parent folder remember
  //   .isAlphanumeric()
  //   .withMessage("Folder ulid must be alphanumeric"),

  (req, res, next) => {
    const errors = validationResult(req);
    console.log("🚀 ~ errors:", errors);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0].msg });
    }
    next();
  },
];

exports.getFolder = [
  // param("folderId")
  //   .isAlphanumeric()
  //   .withMessage("Folder ulid must be alphanumeric")
  //   .optional(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0].msg });
    }
    next();
  },
];

exports.deleteFolder = this.getFolder;
