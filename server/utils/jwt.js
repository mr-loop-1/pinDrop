const jwt = require("jsonwebtoken");
const config = require("../config");

exports.generateToken = async (user) => {
  const payload = {
    id: user.id,
    username: user.username,
  };
  return await jwt.sign(payload, config.jwt.secret);
};
