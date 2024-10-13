const bcrypt = require("bcryptjs");
const config = require("../config");
const jwtService = require("../utils");
const { userModel } = require("../models");

exports.register = async (req, res) => {
  try {
    const body = req.body;
    const hashedPassword = await bcrypt.hash(
      body.password,
      config.bcrypt.saltRounds
    );
    const inputs = { ...body, hashedPassword };
    const newUser = await userModel.createUser(inputs);
    const token = await jwtService.generateToken();
    return res.status(200).json({ user: trimUser(newUser), token });
  } catch (err) {}
};

exports.login = async (req, res) => {
  try {
    const body = req.body;
    const hashedPassword = await bcrypt.hash(
      body.password,
      config.bcrypt.saltRounds
    );
    const inputs = { ...body, hashedPassword };
    const user = await userModel.getUser(inputs);
    const token = await jwtService.generateToken();
    return res.status(200).json({ user: trimUser(user), token });
  } catch (err) {}
};

const trimUser = (user) => ({
  ulid: user.ulid,
  username: user.username,
  email: user.email,
});
