module.exports = {
  jwt: {
    secret: process.env.JWT_SECRET || "sampleSecret",
  },
  bcrypt: {
    saltRounds: 10,
  },
  db: {},
  pinDropName: "pinDrop",
};
