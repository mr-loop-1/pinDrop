const jwt = require("jsonwebtoken");
const config = require("../config");

exports.generateToken = (user) => {
  const payload = {
    ulid: user.ulid,
    // username: user.username,
    email: user.email,
  };
  return jwt.sign(payload, config.jwt.secret);
};
