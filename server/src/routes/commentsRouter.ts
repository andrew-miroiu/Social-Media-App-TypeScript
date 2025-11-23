import express from "express";
import { createClient } from "@supabase/supabase-js";
import { postComment, getComments } from "../controllers/commentsController";

const router = express.Router();

router.post("/postComment", postComment);
router.get("/getComments/:post_id", getComments);

export default router;