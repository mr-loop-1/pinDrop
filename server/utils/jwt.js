const jwt = require("jsonwebtoken");
const config = require("../config");

exports.generateToken = (user) => {
  const payload = {
    id: user.id,
    username: user.username,
  };
  return jwt.sign(payload, config.jwt.secret);
};
