require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const {
  authRoutes,
  userRoutes,
  folderRoutes,
  fileRoutes,
} = require("./routes");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(express.urlencoded({ extended: false }));

app.use("", (req, res) => {
  res.status(200).json({ message: "Server is live" });
});

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/folder", folderRoutes);
app.use("/file", fileRoutes);

app.listen(process.env.PORT || 5000, () => {
  console.log("listning...");
});
