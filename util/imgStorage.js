const multer = require("multer");
const crypto = require("crypto");

const imgStorage = multer.diskStorage({
  // Sets the destination of the uploaded file
  destination: (req, file, cb) => {
    cb(null, "./public/assets/images/uploadedImages");
  },

  // Sets the filename of the uploaded file
  filename: (req, file, cb) => {
    cb(null, `${crypto.randomUUID()}_${file.originalname}`);
  },
});

module.exports = imgStorage;
