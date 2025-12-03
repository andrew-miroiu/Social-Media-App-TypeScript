"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const multer = require("multer");
const storage = multer.memoryStorage();
const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/jpg",
];
function fileFilter(req, file, cb) {
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    }
    else {
        cb(new Error("Invalid file type. Allowed: images only."), false);
    }
}
const upload = multer({
    storage,
    limits: { fileSize: 50 * 1024 * 1024 },
    fileFilter,
});
exports.default = upload;
