const multer = require("multer");
const path = require("path");
const fs = require("fs");

const destinationDir = path.join(process.cwd(), "public/images");

if (!fs.existsSync(destinationDir)) {
  fs.mkdirSync(destinationDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, destinationDir);
  },
  filename: function (req, file, cb) {
    const filename = file.fieldname + "_" + Date.now() + path.extname(file.originalname);
    //console.log("Saving file as:", filename); 
    cb(null, filename);
  }
});

const upload = multer({ storage: storage });

module.exports = upload;
