const multer = require("multer");
const path = require("path");

const storage = multer.memoryStorage(); // Ensure storage is defined before usage
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const filetypes =
      /jpeg|jpg|png|webp|gif|mp4|pdf|doc|docx|txt|text|md|zip|js|jsx|csv|svg/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );

    if (mimetype || extname) {
      return cb(null, true);
    } else {
      return cb(new Error("Error: File type not supported!"));
    }
  },
});

module.exports = upload;
