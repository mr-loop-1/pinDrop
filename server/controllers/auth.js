const bcrypt = require("bcryptjs");
const config = require("../config");
const jwtService = require("../utils");

exports.register = async (req, res) => {
  const body = req.body;
  const hashedPassword = await bcrypt.hash(
    body.password,
    config.bcrypt.saltRounds
  );
  // create user
  const token = await jwtService.generateToken();

  return res.json(data);
};

exports.login = async (req, res) => {};
