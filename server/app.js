require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(express.urlencoded({ extended: false }));

app.use("", (req, res) => {
  res.status(200).json({ message: "Server is live" });
});

app.listen(process.env.PORT || 5000, () => {
  console.log("listning...");
});
