import express from "express";
import { createPost, getPosts, getPostsByUser } from "../controllers/postController";
import upload from "../middleware/upload";

const router = express.Router();

// mounted at /posts in server/src/index.ts
router.get("/user/:userId", getPostsByUser);
router.get("/", getPosts);
router.post("/", upload.single("file"), createPost);

export default router;
