const multer = require("multer");

const storage = multer.memoryStorage();

const allowedTypes = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/jpg",
  "video/mp4",
  "video/webm",
  "video/quicktime",
];

function fileFilter(req: any, file: any, cb: any) {
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Allowed: images and videos only."), false);
  }
}

const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 },
  fileFilter,
});

export default upload;
