const jwt = require("jsonwebtoken");
const config = require("../config");
const { userModel } = require("../models");
const { PinataSDK } = require("pinata");

exports.authenticateToken = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ error: "Unauthorized - Token not provided" });
  }

  jwt.verify(token.slice(7), config.jwt.secret, async (err, payload) => {
    if (err) {
      return res.status(401).json({ error: "Unauthorized - Invalid token" });
    }
    try {
      const user = await userModel.getUser({ email: payload.email });
      if (!user) {
        res.status(404).json({ error: "User not found" });
      }

      req.pinata = new PinataSDK({
        pinataJwt: user.jwt,
        pinataGateway: user.gateway,
      });
      req.user = user;
      next();
    } catch (err) {
      console.log("🚀 ~ jwt.verify ~ err:", err);
      return res.status(500).json({ error: "Server Error" });
    }
  });
};
