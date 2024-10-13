const multer = require("multer");

const storage = multer.memoryStorage(); // Ensure storage is defined before usage
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif|pdf|docx|txt|csv/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );

    console.log(
      `MIME Type: ${file.mimetype}, Original Name: ${file.originalname}, Mimetype Valid: ${mimetype}, Extname Valid: ${extname}`
    );

    if (mimetype || extname) {
      return cb(null, true);
    } else {
      return cb(new Error("Error: File type not supported!"));
    }
  },
});

module.exports = upload;
