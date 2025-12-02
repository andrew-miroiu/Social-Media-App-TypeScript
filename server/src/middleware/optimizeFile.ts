import sharp from "sharp";
import type { Express } from "express";

export async function optimizeImage(file: Express.Multer.File) {
  if (!file.mimetype.startsWith("image/")) {
    return file.buffer;
  }

  return await sharp(file.buffer)
    .resize({ width: 1024, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toBuffer();
}
