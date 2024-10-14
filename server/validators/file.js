const { body, validationResult } = require("express-validator");

exports.uploadFile = [
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0].msg });
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
