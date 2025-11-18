import express from "express";
import { createPost, getPosts } from "../controllers/postController";
import upload from "../middleware/upload";

const router = express.Router();

// mounted at /posts in server/src/index.ts
router.get("/", getPosts);

router.post("/", upload.single("file"), createPost);

export default router;
