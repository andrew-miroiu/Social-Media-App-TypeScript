"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.optimizeImage = optimizeImage;
const sharp_1 = __importDefault(require("sharp"));
async function optimizeImage(file) {
    if (!file.mimetype.startsWith("image/")) {
        return file.buffer;
    }
    return await (0, sharp_1.default)(file.buffer)
        .webp({ quality: 80 })
        .toBuffer();
}
