const multer = require("multer");
const fs = require("fs");
const path = require("path");

// go up from /src/middleware → /src → /uploads
const uploadDir = path.join(__dirname, "../uploads");

// ensure uploads folder exists
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function(req, file, cb) {
        const uniqueName = Date.now() + "-" + file.originalname;
        cb(null, uniqueName);
    },
});

const upload = multer({ storage });

module.exports = upload;