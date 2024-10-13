const jwt = require("jsonwebtoken");
const config = require("../config");

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
      const user = await getUser();
      req.user = user;
      next();
    } catch (err) {
      return res.status(500).json({ error: "Server Error" });
    }
  });
};
