const { body, validationResult } = require("express-validator");

exports.uploadFile = [
  // body("folderId")
  //   .isString()
  //   .withMessage("Filename must be a string")
  //   .isLength({ min: 1, max: 50 })
  //   .withMessage("Filename must be between 1 and 50 char"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

// exports.downloadFile = [
//   params("id").isString().withMessage("File id must be a string"),

//   (req, res, next) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }
//     next();
//   },
// ];
// exports.deleteFiles = this.downloadFile;
