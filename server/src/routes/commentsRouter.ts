import express from "express";
import { createClient } from "@supabase/supabase-js";
import { postComment, getComments, getNumberOfComments } from "../controllers/commentsController";

const router = express.Router();

router.post("/postComment", postComment);
router.get("/getComments/:post_id", getComments);
router.get("/numberOfComments/:post_id", getNumberOfComments);

export default router;