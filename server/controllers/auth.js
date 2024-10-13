const bcrypt = require("bcryptjs");
const config = require("../config");
const { jwtService } = require("../utils");
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
    const token = jwtService.generateToken(newUser);
    return res.status(200).json({ user: trimUser(newUser), token });
  } catch (error) {
    console.log("🚀 ~ exports.login= ~ err:", error);
    res.status(500).json({ error: `Register Error - ${error.message}` });
  }
};

exports.login = async (req, res) => {
  try {
    const body = req.body;
    const user = await userModel.getUser(body);
    if (!(await bcrypt.compare(body.password, user.password))) {
      return res.status(401).json("Unauthorized - wrong password");
    }
    const token = jwtService.generateToken(user);
    return res.status(200).json({ user: trimUser(user), token });
  } catch (error) {
    console.log("🚀 ~ exports.login= ~ err:", error);
    res.status(500).json({ error: `Login Error - ${error.message}` });
  }
};

const trimUser = (user) => ({
  ulid: user.ulid,
  username: user.username,
  email: user.email,
});
