const bcrypt = require("bcryptjs");
const config = require("../config");
const jwtService = require("../utils");
const { userModel, folderModel } = require("../models");

exports.register = async (req, res) => {
  try {
    const body = req.body;
    const hashedPassword = await bcrypt.hash(
      body.password,
      config.bcrypt.saltRounds
    );
    const inputs = {...body, hashedPassword}

    const newUser = await userModel.createUser(inputs);

    const token = await jwtService.generateToken();
    return res.json();
  } catch (err) {}
};

exports.login = async (req, res) => {};
