import sharp from "sharp";
import type { Express } from "express";

export async function optimizeImage(file: Express.Multer.File) {
  if (!file.mimetype.startsWith("image/")) {
    return file.buffer;
  }

  return await sharp(file.buffer)
    .rotate()
    .webp({ quality: 80 })
    .toBuffer();
}
