const { body, validationResult } = require("express-validator");

exports.validateRegister = [
  body("username")
    .isAlphanumeric()
    .withMessage("Username must contain only alphanumeric characters")
    .isLength({ min: 5, max: 20 })
    .withMessage("Username must be between 5 and 20 characters"),

  body("email").isEmail().withMessage("Please provide a valid email address"),

  body("password")
    .isLength({ min: 5, max: 50 })
    .withMessage("Password must be between 5 and 50 characters"),
  body("pinataJwt")
    .isString()
    .withMessage("Jwt must be a string")
    .matches(/^\S+$/)
    .withMessage("Jwt cannot contain spaces"),

  body("pinataGateway")
    .isString()
    .withMessage("pinataGateway must be a string")
    .matches(/^\S+$/)
    .withMessage("pinataGateway cannot contain spaces"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

exports.validateLogin = [
  body("email").isEmail().withMessage("Please provide a valid email address"),

  body("password")
    .isLength({ min: 5, max: 50 })
    .withMessage("Password must be between 5 and 50 characters")
    .matches(/^[\w\W]{5,50}$/)
    .withMessage("Password must contain alphanumeric and special characters"),

  (req, res, next) => {
    const errors = validationResult(req);
    console.log("🚀 ~ errors:", errors);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
